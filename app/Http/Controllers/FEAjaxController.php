<?php

namespace App\Http\Controllers;

use App\Model\UserCartOnline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use App\User;

use App\Api\Core;
use App\Api\FE;

use App\Model\Product;
use App\Model\Contact;
use App\Model\UserWishlist;
use App\Model\UserCartProduct;
use App\Model\UserCart;
use App\Model\ProductCategory;
use App\Model\ProductReview;
use App\Model\MailQueue;
use App\Model\GhnDistrict;
use App\Model\GhnProvince;
use App\Model\GhnWard;

use \Session;
use \Artisan;

class FEAjaxController extends Controller
{
    protected $_apiCore = null;
    protected $_apiFE = null;

    public function __construct()
    {
        $this->_apiCore = new Core();
        $this->_apiFE = new FE();
    }

    //sp
    public function spLove(Request $request)
    {
        $values = $request->post();
        $viewer = $this->_apiCore->getViewer();
        $itemId = (isset($values['pid'])) ? (int)$values['pid'] : 0;

        $product = Product::find($itemId);
        if ($product) {
            if ($viewer) {
                $row = UserWishlist::where('user_id', $viewer->id)
                    ->where('product_id', $product->id)
                    ->first();
                if ($row) {
                    $row->delete();

                    $product->update([
                        'love_count' => $product->love_count - 1,
                    ]);
                } else {
                    UserWishlist::create([
                        'user_id' => $viewer->id,
                        'product_id' => $product->id,
                    ]);

                    $product->update([
                        'love_count' => $product->love_count + 1,
                    ]);
                }
            } else {
                //
                $loved = (Session::get('USR_LOVE'));
                if (!$loved || !count($loved)) {
                    $loved = [];
                }

                if (count($loved) && in_array($product->id, $loved)) {
                    $loved = array_diff($loved, [$product->id]);

                    $product->update([
                        'love_count' => $product->love_count - 1,
                    ]);
                } else {
                    $loved[] = $product->id;

                    $product->update([
                        'love_count' => $product->love_count + 1,
                    ]);
                }

                Session::put('USR_LOVE', $loved);
            }
        }

        $count = $this->_apiFE->getSPLovedCount();

        return response()->json(['count' => $count]);
    }

    public function spByBrand(Request $request)
    {
        $values = $request->post();
        $html = '';

        if (isset($values['bid']) && isset($values['page'])) {
            $products = $this->_apiFE->getProductsByBrandId((int)$values['bid'], (int)$values['page']);
            if (count($products)) {
                $html = view('modals.product')
                    ->with('products', $products)
                    ->render();
            }
        }

        return response()->json(['BODY' => $html]);
    }

    public function spBuy(Request $request)
    {
        $values = $request->post();
        $viewer = $this->_apiCore->getViewer();
        $quantity = (isset($values['quantity']) && (int)$values['quantity']) ? (int)($values['quantity']) : 1;
        $itemId = (isset($values['pid']) && (int)$values['pid']) ? (int)($values['pid']) : 0;

        $this->_apiCore->clearCache();

        $product = Product::find($itemId);
        if ($product) {
            if ($viewer) {
                $cart = $viewer->getCart();

                $row = UserCartProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->where('deleted', 0)
                    ->first();

                if ($row) {
                    $quantity = $row->quantity + $quantity;

                    $row->update([
                        'quantity' => $quantity >= 100 ? 99 : $quantity,
                    ]);
                } else {
                    UserCartProduct::create([
                        'cart_id' => $cart->id,
                        'product_id' => $product->id,
                        'quantity' => $quantity >= 100 ? 99 : $quantity,
                    ]);
                }

                $cart->updateCart();
            } else {
                $cart = (Session::get('USR_CART'));
                $cartQty = (Session::get('USR_CART_QTY'));

                if (!$cart || !count($cart)) {
                    $cart = [];
                }
                if (!$cartQty || !count($cartQty)) {
                    $cartQty = [];
                }

                if (count($cart) && in_array($product->id, $cart)) {
//                    $cart = array_diff($cart, [$product->id]);
                } else {
                    $cart[] = $product->id;
                }

                foreach ($cart as $gh) {

                    if (count($cartQty)) {
                        if (isset($cartQty[$gh]) && $cartQty[$gh]) {
                            if ($gh == $product->id) {
                                $qty = (int)$cartQty[$gh] + $quantity;
                            } else {
                                $qty = (int)$cartQty[$gh];
                            }
                        } else {
                            $qty = $quantity;
                        }

                        $cartQty[$gh] = $qty >= 100 ? 99 : $qty;

                    } else {
                        $cartQty[$gh] = $quantity;
                    }
                }

                Session::put('USR_CART', $cart);
                Session::put('USR_CART_QTY', $cartQty);

                $this->_apiCore->clearCache();
            }
        }

        $html = view('modals.ttv.cart_side_products')
            ->render();

        $count = $this->_apiFE->getSPCartCount();

        return response()->json(['BODY' => $html, 'COUNT' => $count]);
    }

    public function spBuySide(Request $request)
    {
        $values = $request->post();
        $viewer = $this->_apiCore->getViewer();
        $quantity = (isset($values['quantity']) && (int)$values['quantity']) ? (int)($values['quantity']) : 0;
        $itemId = (isset($values['item_id']) && (int)$values['item_id']) ? (int)($values['item_id']) : 0;

        $this->_apiCore->clearCache();

        $product = Product::find($itemId);
        if ($product) {
            if ($viewer) {
                $cart = $viewer->getCart();

                $row = UserCartProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->where('deleted', 0)
                    ->first();

                if ($row) {
                    if ($quantity) {
                        $row->update([
                            'quantity' => $quantity >= 100 ? 99 : $quantity,
                        ]);
                    } else {
                        $row->delete();
                    }
                } else {
                    if ($quantity) {
                        UserCartProduct::create([
                            'cart_id' => $cart->id,
                            'product_id' => $product->id,
                            'quantity' => $quantity >= 100 ? 99 : $quantity,
                        ]);
                    }
                }

                if ($quantity) {
                    $cart->updateCart();
                }

            } else {
                $cart = (Session::get('USR_CART'));
                $cartQty = (Session::get('USR_CART_QTY'));

                if (!$cart || !count($cart)) {
                    $cart = [];
                }
                if (!$cartQty || !count($cartQty)) {
                    $cartQty = [];
                }

                if (count($cart) && in_array($product->id, $cart)) {
                    if (!$quantity) {
                        $cart = array_diff($cart, [$product->id]);
                    }

                } else {
                    if ($quantity) {
                        $cart[] = $product->id;
                    }
                }

                foreach ($cart as $gh) {

                    if (count($cartQty)) {
                        if (isset($cartQty[$gh]) && $cartQty[$gh]) {
                            if ($gh == $product->id) {
                                $qty = $quantity;
                            } else {
                                $qty = (int)$cartQty[$gh];
                            }
                        } else {
                            $qty = $quantity;
                        }

                        if ($qty) {
                            $cartQty[$gh] = $qty >= 100 ? 99 : $qty;
                        }

                    } else {
                        if ($quantity) {
                            $cartQty[$gh] = $quantity;
                        }
                    }
                }

                if (!$quantity && count($cart) != count($cartQty)) {
                    unset($cartQty[$product->id]);
                }

                Session::put('USR_CART', $cart);
                Session::put('USR_CART_QTY', $cartQty);

                $this->_apiCore->clearCache();

            }
        }

        $count = $this->_apiFE->getSPCartCount();

        return response()->json(['COUNT' => $count]);
    }

    public function spRemove(Request $request)
    {
        $values = $request->post();
        $viewer = $this->_apiCore->getViewer();
        $itemId = (isset($values['ite']) && (int)$values['ite']) ? (int)($values['ite']) : 0;

        $this->_apiCore->clearCache();

        $product = Product::find($itemId);
        if ($product) {
            if ($viewer) {
                $cart = $viewer->getCart();

                $row = UserCartProduct::where('cart_id', $cart->id)
                    ->where('product_id', $product->id)
                    ->where('deleted', 0)
                    ->first();

                if ($row) {
                    $row->delete();
                }

                $cart->updateCart();
            } else {
                $cart = (Session::get('USR_CART'));
                if (!$cart || !count($cart)) {
                    $cart = [];
                }

                if (count($cart) && in_array($product->id, $cart)) {
                    $cart = array_diff($cart, [$product->id]);
                }

                Session::put('USR_CART', $cart);

                $this->_apiCore->clearCache();
            }
        }

        $count = $this->_apiFE->getSPCartCount();

        return response()->json(['count' => $count]);
    }

    public function spReview(Request $request)
    {
        $values = $request->post();
//        echo '<pre>';var_dump($values);die;
        $itemId = (isset($values['item_id'])) ? (int)$values['item_id'] : 0;
        $star = (isset($values['star'])) ? (int)$values['star'] : 0;
        $phone = (isset($values['phone'])) ? $this->_apiCore->cleanStr($values['phone']) : '';
        $email = (isset($values['email'])) ? $this->_apiCore->cleanStr($values['email']) : '';
        $note = (isset($values['note'])) ? $this->_apiCore->cleanStr($values['note']) : '';
        $html = '';
        $viewer = $this->_apiCore->getViewer();

        $product = Product::find($itemId);
        if ($product) {
            if ($viewer) {
                $row = ProductReview::where('user_id', $viewer->id)
                    ->where('product_id', $product->id)
                    ->first();
                if ($row) {
                    return response()->json(['VALID' => false, 'ERR' => 'EXIST']);
                }

                if (!$product->isBought($viewer)) {
                    return response()->json(['VALID' => false, 'ERR' => 'NONE']);
                }

                //
                $this->_apiCore->notifyAllStaffs('review_new', [
                    'object_type' => 'product',
                    'object_id' => $product->id,
                    'star' => $star,
                ]);

                //insert
                $row = ProductReview::create([
                    'user_id' => $viewer->id,
                    'product_id' => $product->id,
                    'note' => $note,
                    'star' => $star,
                    'active' => $star >= 4 ? 1 : 0,
                ]);

            } else {
                $row = ProductReview::where('user_id', 0)
                    ->where('phone', $phone)
                    ->where('email', $email)
                    ->where('product_id', $product->id)
                    ->first();
                if ($row) {
                    return response()->json(['VALID' => false, 'ERR' => 'EXIST']);
                }

                if (!$product->isBought(NULL, ['phone' => $phone, 'email' => $email])) {
                    return response()->json(['VALID' => false, 'ERR' => 'NONE']);
                }

                //
                $this->_apiCore->notifyAllStaffs('review_new', [
                    'object_type' => 'product',
                    'object_id' => $product->id,
                    'star' => $star,
                ]);

                //insert
                $row = ProductReview::create([
                    'phone' => $phone,
                    'email' => $email,
                    'product_id' => $product->id,
                    'note' => $note,
                    'star' => $star,
                    'active' => $star >= 4 ? 1 : 0,
                ]);

            }

            $product->reCalStar();

            $html = view('modals.front_end.product_review')
                ->with('review', $row)
                ->render();

            if (!$row->active) {
                $html = '';
            }

            return response()->json(['VALID' => true, 'BODY' => $html, 'COUNT' => $product->countReviewStar($star)]);
        }

        return response()->json(['VALID' => false]);
    }

    public function spReviewMore(Request $request)
    {
        $values = $request->post();
//        echo '<pre>';var_dump($values);die;
        $itemId = (isset($values['item_id'])) ? (int)$values['item_id'] : 0;
        $maxId = (isset($values['max'])) ? (int)$values['max'] : 0;
        $product = Product::find($itemId);
        $html = '';

        if ($product) {
            $rows = $product->getReviews([
                'limit' => 5,
                'max' => $maxId,
            ]);
            if (!count($rows)) {
                return response()->json(['VALID' => false]);
            }

            if (count($rows)) {
                foreach ($rows as $row) {
                    $html .= view('modals.product_review')
                        ->with('review', $row)
                        ->render();
                }
            }

            return response()->json(['VALID' => true, 'BODY' => $html]);
        }

        return response()->json(['VALID' => false]);
    }

    public function spRandom()
    {
        $product = Product::where('deleted', 0)
            ->where('active', 1)
            ->whereNotIn('product_category_id', function ($q) {
                $q->select('id')
                    ->from('product_categories')
                    ->where('is_menu', 1);
            })
            ->orderByRaw('RAND()')
            ->limit(1)
            ->first();

        $aClients = [
            'Nguy???n V??n S??n', 'L?? Th??? Lan', 'Cao To??n Minh', 'Hu???nh T???n Th??nh', 'Mai Ch?? C??ng', 'Ph?????ng Hana', 'L??m Minh An',
            'Tr???n ?????c L????ng', 'Tu???n Winner', 'L?? Th??? ????o', 'Tr?? Nguy???n', 'Minh Halo', 'Mai V??n M??', 'Tr????ng C??ng Minh',
            'Trung Cena', 'Ph???m Minh Tr??', 'V?? Ho??i Nam', 'V??n Th??? L???u', 'Minh Th??nh', 'B?? Nam', 'M???nh Ti???n', 'H???i S??n',
            'B??ng Di', 'Minh Ti???n', 'C??ng Nam', 'T???n Tr?????ng', 'Thi??n S??n', 'Kh??i L??', 'Mai Nguy???n', 'Tuy???t L??',
            'H???ng Minh', 'Ninh Xu??n', 'Ch?? Thi???n', 'Ph?? ?????t', 'L???c Ph??c', 'C?? H???ng', 'Anh Ch??', 'Ch??? M??', 'Ch??? Xu??n',
            'H???i Tri???u', 'Th??y Vy', 'Ch?? T??m', 'Ch?? S??u', 'Ch?? Hai', 'Anh Ba', 'Ch??? Ph??c', 'Minh Minh', 'Tu???n Tr?????ng',
            'Hu???nh Sang', 'M?? Vi', 'Minh V??', 'Thi??n Thi??n', 'Ph???m L??', 'Anh Hai', 'Ch??? Ba', 'Ch??? Xu??n', 'Tr??c Nghi',
            'Th??i An', 'Th??i Minh', 'S??n Tr???ng', 'Th???y L??', 'T??ng B??ch', 'Ch??u Khoa', 'Ch??u Nguy???n', 'Xu??n Ph?????c',
            'T??o L??', 'M???ng C???m', 'Ph??c An', 'C??ng Tr???ng', 'Thi??n Ph??', 'H???ng ??n', 'B?? Minh', 'Vy Vy', 'Xu??n Ngh???',
        ];

        $aActions = [
            '???? y??u th??ch s???n ph???m', '???? ?????t h??ng s???n ph???m', '???? th??m v??o gi??? h??ng'
        ];

        $randClient = rand(0, count($aClients)-1);
        $randAction = rand(0, 2);

        return response()->json([
            'KH' => $aClients[$randClient],
            'IMG' => $product->getAvatar(),
            'URL' => $product->getHref(true),
            'SP' => $product->getTitle(),
            'DO' => $aActions[$randAction],
            'TIME' => rand(8, 25),
        ]);
    }


}
