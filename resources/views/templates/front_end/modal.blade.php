<?php
$apiCore = new \App\Api\Core;
$viewer = $apiCore->getViewer();

$apiMobile = new \App\Api\Mobile;
$isMobile = $apiMobile->isMobile() ? 1 : 0;

$pageTitle = (isset($page_title)) ? $page_title : $apiCore->getSetting('site_title');
$siteTitle = $apiCore->getSetting('site_title');
$keywords = $apiCore->getSetting('site_seo');
$description = (isset($description)) ? $description : $apiCore->getSetting('site_short_description');

$maxSize = $apiCore->getMaxSize();
$maxSizeText = $apiCore->getMaxSizeText();

$siteLogo = $apiCore->getSetting('site_logo');
$hotline = $apiCore->getSetting('site_hotline');
$tuvan = $apiCore->getSetting('site_tuvan');
$siteEmail = $apiCore->getSetting('site_email');
$sitePhone = $apiCore->getSetting('site_phone');
$siteAddress = $apiCore->getSetting('site_address');
$siteAbout = $apiCore->getSetting('site_short_description');

$brands = $apiCore->getBrands();

$apiFE = new \App\Api\FE;
$cates = $apiFE->getProductCategories(6);
$countLoved = $apiFE->getSPLovedCount();
$countCart = $apiFE->getSPCartCount();

$loginPage = (isset($login_page) && $login_page) ? true : false;

$provinces = $apiFE->getProvinces();


$previousURL = url()->current();
//die;
?>


<div id="nt_login_canvas" class="nt_fk_canvas dn lazyloaded" >
    @if (!$viewer && !$loginPage)
    <div id="frm-login">
        <form method="post" action="{{url('auth/dang-nhap')}}" id="customer_login" accept-charset="UTF-8"
              class="nt_mini_cart flex column h__100 is_selected">
            @csrf
            <div class="mini_cart_header flex fl_between al_center">
                <h3 class="widget-title tu fs__16 mg__0 text-uppercase">{{$apiCore->getSetting('text_dn_title')}}</h3>
                <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
            </div>
            <div class="mini_cart_wrap">
                <div class="mini_cart_content fixcl-scroll">
                    <div class="fixcl-scroll-content">
                        <p class="form-row">
                            <label for="CustomerEmail" class="required frm-label">* {{$apiCore->getSetting('text_dn_email')}}</label>
                            <input required type="email" name="email" id="frm-email" autocomplete="off" />
                        </p>
                        <div class="form-group" id="err-email">
                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dn_loi_email')}}</div>
                        </div>

                        <p class="form-row">
                            <label for="CustomerPassword" class="required frm-label">* {{$apiCore->getSetting('text_dn_mat_khau')}}</label>
                            <input required autocomplete="new-password" type="password" name="password" id="frm-password" />
                        </p>
                        <div class="form-group" id="err-password">
                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dn_loi_mk')}}</div>
                        </div>

                        <input type="hidden" name="referer" value="{{$previousURL}}" />

                        <p class="form-row text-uppercase fs-12 text-bold hidden">
                            <input type="checkbox" name="remember" checked="checked" class="width_height_20" />
                            Ghi Nh??? ????ng Nh???p
                        </p>

                        <input type="submit" class="button button_primary w__100 text-uppercase" value="{{$apiCore->getSetting('text_dn_xac_nhan')}}">
                        <br />

                        <div class="clearfix">
                            <div class="float-right ml-2">
                                <p class="mt-2">
                                    <a data-no-instant="" rel="nofollow" href="#recover" data-id="#RecoverForm" class="link_acc fs-13 text-bold text-uppercase text-danger">
                                        {{$apiCore->getSetting('text_dn_quen_mat_khau')}}
                                    </a>
                                </p>
                            </div>

                            <div class="overflow-hidden">
                                <p class="mt-2">
                                    <a data-no-instant="" rel="nofollow" href="/" data-id="#frm-signup" class="link_acc fs-13 text-bold text-uppercase text-info">
                                        {{$apiCore->getSetting('text_dn_chua_co_tai_khoan')}}
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div class="form-row overflow-hidden clearfix mt__30">
                            <button type="button" class="button fs-13 button_primary width_full text-uppercase mb__15" onclick="openPage('{{url('auth/redirect/facebook')}}')">
                                <img width="20" class="mr__5" src="{{url('public/images/facebook.png')}}" style="margin-top: -5px;" /> {{$apiCore->getSetting('text_dn_facebook')}}
                            </button>
                            <button type="button" class="button fs-13 width_full text-uppercase mb__15" onclick="openPage('{{url('auth/redirect/google')}}')">
                                <img width="20" class="mr__5" src="{{url('public/images/google.png')}}" style="margin-top: -3px;" /> {{$apiCore->getSetting('text_dn_google')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div id="frm-forgot">
        <form method="post" action="" id="RecoverForm" accept-charset="UTF-8"
              class="nt_mini_cart flex column h__100" onsubmit="return dtjsauthfp()">
            @csrf
            <div class="mini_cart_header flex fl_between al_center">
                <h3 class="widget-title tu fs__16 mg__0 text-uppercase">qu??n m???t kh???u</h3>
                <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
            </div>
            <div class="mini_cart_wrap">
                <div class="mini_cart_content fixcl-scroll">
                    <div class="fixcl-scroll-content">
                        <div class="form-group">
                            <div class="alert alert-warning">
                                H??y nh???p ?????a ch??? email c???a b???n, ch??ng t??i s??? g???i email k??ch ho???t l???y l???i m???t kh???u sau ??t ph??t.
                            </div>
                        </div>

                        <div class="form-group">
                            <input autocomplete="off" class="form-control text-center" type="email" name="email"
                                   placeholder="?????a ch??? email" required
                            />
                        </div>
                        <div class="form-group" id="err-email">
                            <div class="alert alert-danger hidden mt-1">H??y nh???p email h???p l???.</div>
                        </div>

                        <input type="submit" class="button button_primary w__100 tu text-uppercase mt-2" value="g???i y??u c???u">
                        <br />

                        <input type="hidden" id="frm-base-url" value="{{url('')}}" />

                        <p class="mb__10 mt__20">
                            <a data-no-instant="" rel="nofollow" href="/" data-id="#customer_login" class="link_acc text-uppercase fs-12">
                                tr??? v??? ????ng nh???p
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div>
        <form method="post" action="{{url('auth/dang-ki')}}" id="frm-signup" accept-charset="UTF-8"
              class="nt_mini_cart flex column h__100" autocomplete="off"
              onsubmit="return dtjsauthdk();"
        >
            @csrf
            <div class="mini_cart_header flex fl_between al_center">
                <h3 class="widget-title tu fs__16 mg__0">{{$apiCore->getSetting('text_dk_dang_ki_thanh_vien')}}</h3>
                <i class="close_pp pegk pe-7s-close ts__03 cd"></i>
            </div>
            <div class="mini_cart_wrap">
                <div class="mini_cart_content fixcl-scroll">
                    <div class="fixcl-scroll-content">
                        <div class="form-group input-name">
                            <label class="required frm-label">* {{$apiCore->getSetting('text_dk_ho_ten')}}</label>
                            <input required class="form-control input" autocomplete="off" type="text" name="name" />
                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dk_loi_ht')}}</div>
                        </div>

                        <div class="form-group input-email">
                            <label class="required frm-label">* {{$apiCore->getSetting('text_dk_email')}}</label>
                            <input required class="form-control input" autocomplete="off" type="email" name="email" />

                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dk_loi_email')}}</div>
                        </div>

                        <div class="form-group input-password">
                            <label class="required frm-label">* {{$apiCore->getSetting('text_dk_mat_khau')}}</label>
                            <input required class="form-control input" autocomplete="new-password" type="password" name="password" />

                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dk_loi_mk')}}</div>
                        </div>

                        <div class="form-group input-password2">
                            <label class="required frm-label">* {{$apiCore->getSetting('text_dk_xac_nhan_mat_khau')}}</label>
                            <input required class="form-control input" autocomplete="new-password" type="password" name="password_confirm" />

                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dk_loi_xnmk')}}</div>
                        </div>

                        <div class="form-group input-phone">
                            <label class="frm-label required">* {{$apiCore->getSetting('text_dk_dien_thoai')}}</label>
                            <input class="form-control" autocomplete="off" type="text" name="phone"  required
                                   onkeypress="return isInputPhone(event, this)"
                                   oncopy="return false;" oncut="return false;" onpaste="return false;"
                            />

                            <div class="alert alert-danger hidden mt-1">{{$apiCore->getSetting('text_dk_loi_dt')}}</div>
                        </div>

                        <div class="form-group input-address">
                            <label class="frm-label">{{$apiCore->getSetting('text_dk_dia_chi')}}</label>
                            <input autocomplete="off" type="text" name="address" class="form-control" />
                        </div>

                        <div class="form-group">
                            <select name="province_id" class="form-control select-css" onchange="jscartaddressopts(this, 'district')">
                                <option value="">H??y ch???n t???nh / th??nh</option>
                                @foreach($provinces as $ite)
                                    <option value="{{$ite->id}}">{{$ite->title}}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="form-group">
                            <select name="district_id" class="form-control select-css" onchange="jscartaddressopts(this, 'ward')">
                                <option value="">H??y ch???n qu???n / huy???n</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <select name="ward_id" class="form-control select-css">
                                <option value="">H??y ch???n ph?????ng / x??</option>
                            </select>
                        </div>

                        <div class="form-group alert alert-danger hidden mt-2" id="err-signup"></div>

                        <input type="submit" value="{{$apiCore->getSetting('text_dk_xac_nhan')}}" class="button button_primary w__100 tu text-uppercase mt-2">
                        <br>

                        <input name="referer" type="hidden" value="{{$previousURL}}" />

                        <p class="mb__10 mt__15">
                            <a data-no-instant="" rel="nofollow" href="/" data-id="#customer_login" class="link_acc text-uppercase fs-12 text-bold">
                                {{$apiCore->getSetting('text_dk_tro_ve_dang_nhap')}}
                            </a>
                        </p>

                        <div class="form-row overflow-hidden clearfix mt__30">
                            <button type="button" class="button fs-13 button_primary width_full text-uppercase mb__15" onclick="openPage('{{url('auth/redirect/facebook')}}')">
                                <img width="20" class="mr__5" src="{{url('public/images/facebook.png')}}" style="margin-top: -5px;" /> {{$apiCore->getSetting('text_dk_facebook')}}
                            </button>
                            <button type="button" class="button fs-13 width_full text-uppercase mb__15" onclick="openPage('{{url('auth/redirect/google')}}')">
                                <img width="20" class="mr__5" src="{{url('public/images/google.png')}}" style="margin-top: -3px;" /> {{$apiCore->getSetting('text_dk_google')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    @endif
</div>

<div id="nt_menu_canvas" class="nt_fk_canvas nt_sleft dn lazyloaded" data-include="/search/?view=mn" data-currentinclude="">
    <div class="mb_nav_tabs flex al_center mb_cat_true">
        <div class="mb_nav_title mb_nav_title_1 menu_1 pr mb_nav_ul flex al_center fl_center active"
            @if ($isMobile) onclick="jsbindmobimenuside('menu_1')" @endif
        >
            <span class="db truncate text-bold">{{$siteTitle}}</span>
        </div>
        <div class="mb_nav_title mb_nav_title_2 menu_2 pr flex al_center fl_center"
             @if ($isMobile) onclick="jsbindmobimenuside('menu_2')" @endif
        >
            <span class="db truncate text-uppercase text-bold">s???n ph???m</span>
        </div>
    </div>
    <div class="shopify-section mb_nav_tab menu_1 active">
        <ul id="menu_mb_ul" class="nt_mb_menu">
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('gioi-thieu')}}">v??? ch??ng t??i</a>
            </li>
{{--            <li class="menu-item item-level-0">--}}
{{--                <a class="text-capitalize" href="{{url('thuong-hieu')}}">th????ng hi???u</a>--}}
{{--            </li>--}}
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('goc-tu-van')}}">g??c t?? v???n</a>
            </li>
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('tin-tuc')}}">tin t???c</a>
            </li>
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('lien-he')}}">li??n h???</a>
            </li>
            @if (!$viewer)
                <li class="menu-item item-level-0">
                    <a class="text-capitalize" href="{{url('dang-nhap')}}">
                        <i class="fa fa-sign-in-alt mr-1"></i> ????ng nh???p
                    </a>
                </li>
                <li class="menu-item item-level-0">
                    <a class="text-capitalize" href="{{url('dang-nhap?v=dk')}}">
                        <i class="fa fa-user mr-1"></i> ????ng k?? th??nh vi??n
                    </a>
                </li>
            @endif
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('gio-hang')}}">
                    <i class="fa fa-cart-plus mr-1"></i> gi??? h??ng
                </a>
            </li>
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('yeu-thich')}}">
                    <i class="fa fa-heart mr-1"></i> y??u th??ch
                </a>
            </li>
            @if ($viewer)
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('tai-khoan')}}">
                    <i class="fa fa-user mr-1"></i> t??i kho???n
                </a>
            </li>
            <li class="menu-item item-level-0">
                <a class="text-capitalize" href="{{url('dang-xuat')}}">
                    <i class="fa fa-sign-out mr-1"></i> ????ng xu???t
                </a>
            </li>
            @endif
        </ul>
    </div>

    <div class="shopify-section mb_nav_tab menu_2">
        <ul class="nt_mb_menu">
            @if ($cates)
                <?php foreach($cates as $cate):
                $subs = $cate->getSubCategories();
                ?>
                    <li class="menu-item item-level-0 cate_0">
                        <a class="text-capitalize" href="{{$cate->getHref()}}">{{$cate->getTitle()}}</a>
                    </li>
                    @if (count($subs))
                        <?php foreach($subs as $sub):

                        ?>
                            <li class="menu-item item-level-1 cate_1">
                                <a class="text-capitalize" href="{{$sub->getHref()}}">{{$sub->getTitle()}}</a>
                            </li>
                        <?php endforeach;?>
                    @endif
                <?php endforeach;?>
            @else
                <div class="alert alert-warning">??ang C???p Nh???t...</div>
            @endif
        </ul>
    </div>
</div>

<div class="mask-overlay ntpf t__0 r__0 l__0 b__0 op__0 pe_none"></div>

<div id="nt_search_canvas" class="nt_fk_canvas dn lazyloaded" >
    <div class="nt_mini_cart flex column h__100">
        <div class="mini_cart_header flex fl_between al_center">
            <h3 class="widget-title tu fs__16 mg__0">t??m ki???m</h3><i class="close_pp pegk pe-7s-close ts__03 cd"></i>
        </div>
        <div class="mini_cart_wrap">
            <form action="{{url('tim-kiem')}}" method="get" class="search_header mini_search_frm pr " role="search">
                <div class="frm_search_input pr oh">
                    <input class="search_header__input " autocomplete="off" type="text" name="keyword"
                           placeholder="T??m ki???m...">
                    <button class="search_header__submit  pe_none" type="submit"><i class="iccl iccl-search"></i></button>
                </div>
                <div class="ld_bar_search"></div>
            </form>
        </div>
    </div>
</div>
