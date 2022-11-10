<div class="filter_area_js filter_area lazypreload lazyloaded" data-include="/collections/women?sort_by=best-selling&amp;section_id=nt_filter" data-currentinclude="">
    <div id="shopify-section-nt_filter" class="shopify-section nt_ajaxFilter">
        <h3 class="mg__0 tu bgb cw visible-sm fs__16 pr">Filter <i class="close_pp pegk pe-7s-close fs__40 ml__5"></i>
        </h3>
        <div class="cat_shop_wrap">
            <div class="cat_fixcl-scroll">
                <div class="cat_fixcl-scroll-content css_ntbar">
                    <div class="row wrap_filter">
                        <div class="col-12 col-md-3 widget blockid_color">
                            <h5 class="widget-title">By Color</h5>
                            <div class="loke_scroll">
                                <ul class="nt_filter_block nt_filter_color css_ntbar">
                                    <li>
                                        <a href="/collections/women/color-black?sort_by=best-selling" aria-label="Narrow selection to products matching tag color black">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_black"></span>
                                            </div> black
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-cyan?sort_by=best-selling" aria-label="Narrow selection to products matching tag color cyan">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_cyan"></span>
                                            </div> cyan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-green?sort_by=best-selling" aria-label="Narrow selection to products matching tag color green">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_green"></span>
                                            </div> green
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-grey?sort_by=best-selling" aria-label="Narrow selection to products matching tag color grey">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_grey"></span>
                                            </div> grey
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-pink?sort_by=best-selling" aria-label="Narrow selection to products matching tag color pink">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_pink"></span>
                                            </div> pink
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-pink-clay?sort_by=best-selling" aria-label="Narrow selection to products matching tag color pink clay">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_pink-clay"></span>
                                            </div> pink clay
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-sliver?sort_by=best-selling" aria-label="Narrow selection to products matching tag color sliver">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_sliver"></span>
                                            </div> sliver
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-white?sort_by=best-selling" aria-label="Narrow selection to products matching tag color white">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_white"></span>
                                            </div> white
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-white-cream?sort_by=best-selling" aria-label="Narrow selection to products matching tag color white cream">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_white-cream"></span>
                                            </div> white cream
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-beige?sort_by=best-selling" aria-label="Narrow selection to products matching tag color beige">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_beige"></span>
                                            </div> beige
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-blue?sort_by=best-selling" aria-label="Narrow selection to products matching tag color blue">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_blue"></span>
                                            </div> blue
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/collections/women/color-brown?sort_by=best-selling" aria-label="Narrow selection to products matching tag color brown">
                                            <div class="filter-swatch">
                                                <span class="lazyload bg_color_brown"></span>
                                            </div> brown
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 col-12">
        <div id="shopify-section-collection_page" class="shopify-section tp_se_cdt">
            <div class="nt_svg_loader dn"></div>
            <div class="products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 nt_default">
                @foreach($products as $product)
                    <div class="col-lg-3 col-md-3 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                        <div class="product-inner pr">
                            <div class="product-image pr oh lazyloaded product-custom" >
                                <span class="tc nt_labels pa pe_none cw"></span>
                                <a class="db" href="{{$product->getHref(true)}}">
                                    <div class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloaded"
                                         data-id="14246008717451"
                                         data-bgset="{{$product->getAvatar()}}"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url('{{$product->getAvatar()}}');">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="{{$product->getAvatar()}}"
                                                sizes="270px"
                                                srcset="{{$product->getAvatar()}}">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </a>
                                <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                    <div class="pr_lazy_img back-img pa nt_bg_lz lazyloaded"
                                         data-id="14246008750219"
                                         data-bgset="{{$product->getAvatar()}}"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url('{{$product->getAvatar()}}');">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="{{$product->getAvatar()}}"
                                                sizes="270px"
                                                srcset="{{$product->getAvatar()}}">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </div>
                                @if($product->is_new || $product->is_best_seller)
                                    <div class="hot_best ts__03 pa">
                                        @if($product->is_new)
                                            <div class="hot_best_text is_new">mới</div>
                                        @endif
                                        @if($product->is_best_seller)
                                            <div class="hot_best_text is_hot">bán chạy</div>
                                        @endif
                                    </div>
                                @endif
                                @if ($product->price_main != $product->price_pay)
                                    <div class="discount_percent ts__03 pa">
                                        <div class="discount_percent_text">giảm {{$product->discount}}%</div>
                                    </div>
                                @endif
                                <div class="nt_add_w ts__03 pa ">
                                    <div class="product-love sp-love-{{$product->id}}" onclick="jssplove(this, {{$product->id}})">
                                        @if ($product->isLoved())
                                            <i class="fas fa-heart active" title="Đã Yêu Thích SP"></i>
                                        @else
                                            <i class="fas fa-heart" title="Thêm SP Yêu Thích"></i>
                                        @endif
                                    </div>
                                </div>
                                <div class="hover_button op__0 tc pa flex column ts__03">
                                    <a href="javascript:void(0)" data-id="4540696920203" onclick="jscartdh({{$product->id}})"
                                       class="pr pr_atc cd br__40 bgw tc dib cb chp ttip_nt tooltip_top_left"
                                       rel="nofollow"><span class="tt_txt text-capitalize">thêm vào giỏ</span><i
                                            class="iccl iccl-cart"></i><span class="text-capitalize">thêm vào giỏ</span>
                                    </a>
                                </div>
                            </div>
                            <div class="product-info mt__15">
                                <h3 class="product-title pr fs__14 mg__0 fwm"><a
                                        class="cd chp" href="{{$product->getHref(true)}}">{{$product->getTitle()}}</a></h3>
                                <span class="price dib mb__5">
                                        @if ($product->price_main != $product->price_pay)
                                        <del class="price_old">
                                            <span class="number_format">{{$product->price_main}}</span>
                                            <span class="currency_format">₫</span>
                                        </del>
                                    @endif
                                       <ins>
                                            <span class="number_format">{{$product->price_pay}}</span>
                                            <span class="currency_format">₫</span>
                                        </ins>
                                    </span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12 col-12">
        <div id="shopify-section-collection_page" class="shopify-section tp_se_cdt">
            <div class="nt_svg_loader dn"></div>
            <div id="products" class="products nt_products_holder row fl_center row_pr_1 cdt_des_1 round_cd_false nt_cover ratio_nt position_8 space_30 nt_default">
                @foreach($products as $product)
                    <div class="col-lg-3 col-md-3 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                        <div class="product-inner pr">
                            <div class="product-image pr oh lazyloaded product-custom" >
                                <span class="tc nt_labels pa pe_none cw"></span>
                                <a class="db" href="{{$product->getHref(true)}}">
                                    <div class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloaded"
                                         data-id="14246008717451"
                                         data-bgset="{{$product->getAvatar()}}"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url('{{$product->getAvatar()}}');">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="{{$product->getAvatar()}}"
                                                sizes="270px"
                                                srcset="{{$product->getAvatar()}}">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </a>
                                <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                    <div class="pr_lazy_img back-img pa nt_bg_lz lazyloaded"
                                         data-id="14246008750219"
                                         data-bgset="{{$product->getAvatar()}}"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url('{{$product->getAvatar()}}');">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="{{$product->getAvatar()}}"
                                                sizes="270px"
                                                srcset="{{$product->getAvatar()}}">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </div>
                                @if($product->is_new || $product->is_best_seller)
                                    <div class="hot_best ts__03 pa">
                                        @if($product->is_new)
                                            <div class="hot_best_text is_new">mới</div>
                                        @endif
                                        @if($product->is_best_seller)
                                            <div class="hot_best_text is_hot">bán chạy</div>
                                        @endif
                                    </div>
                                @endif
                                @if ($product->price_main != $product->price_pay)
                                    <div class="discount_percent ts__03 pa">
                                        <div class="discount_percent_text">giảm {{$product->discount}}%</div>
                                    </div>
                                @endif
                                <div class="nt_add_w ts__03 pa ">
                                    <div class="product-love sp-love-{{$product->id}}" onclick="jssplove(this, {{$product->id}})">
                                        @if ($product->isLoved())
                                            <i class="fas fa-heart active" title="Đã Yêu Thích SP"></i>
                                        @else
                                            <i class="fas fa-heart" title="Thêm SP Yêu Thích"></i>
                                        @endif
                                    </div>
                                </div>
                                <div class="hover_button op__0 tc pa flex column ts__03">
                                    <a href="javascript:void(0)" data-id="4540696920203" onclick="jscartdh({{$product->id}})"
                                       class="pr pr_atc cd br__40 bgw tc dib cb chp ttip_nt tooltip_top_left"
                                       rel="nofollow"><span class="tt_txt text-capitalize">thêm vào giỏ</span><i
                                            class="iccl iccl-cart"></i><span class="text-capitalize">thêm vào giỏ</span>
                                    </a>
                                </div>
                            </div>
                            <div class="product-info mt__15">
                                <h3 class="product-title pr fs__14 mg__0 fwm"><a
                                        class="cd chp" href="{{$product->getHref(true)}}">{{$product->getTitle()}}</a></h3>
                                <span class="price dib mb__5">
                                        @if ($product->price_main != $product->price_pay)
                                        <del class="price_old">
                                            <span class="number_format">{{$product->price_main}}</span>
                                            <span class="currency_format">₫</span>
                                        </del>
                                    @endif
                                       <ins>
                                            <span class="number_format">{{$product->price_pay}}</span>
                                            <span class="currency_format">₫</span>
                                        </ins>
                                    </span>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString)
    let page = params.get('page') ?? 1;
    let products = null;
    let lastPage = 1000;

    $(window).scroll(function () {
        if ($(window).scrollTop() === $(document).height() - $(window).height() && page < 2) {
            appendProducts();
        }
    });

    async function appendProducts() {
        console.log(page + ' ' + lastPage)
        if(page < lastPage) {
            page++;
            const response = await getData(page);
            lastPage = response.last_page;
            const products = response.data;

            let html = '';
            for(let product of products) {
                const avatar = await getAvatar(product.id);
                html += `
                <div class="col-lg-3 col-md-3 col-12 pr_animated done mt__30 pr_grid_item product nt_pr desgin__1">
                        <div class="product-inner pr">
                            <div class="product-image pr oh lazyloaded product-custom" >
                                <span class="tc nt_labels pa pe_none cw"></span>
                                <a class="db" href="/san-pham/${product.href}">
                                    <div class="pr_lazy_img main-img nt_img_ratio nt_bg_lz lazyloaded"
                                         data-id="14246008717451"
                                         data-bgset="${ avatar }"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url( ${avatar});">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="${ avatar }"
                                                sizes="270px"
                                                srcset="${ avatar }">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </a>
                                <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                                    <div class="pr_lazy_img back-img pa nt_bg_lz lazyloaded"
                                         data-id="14246008750219"
                                         data-bgset="${ avatar }"
                                         data-parent-fit="width" data-wiis="" data-ratio="0.7837837837837838"
                                         style="padding-top: 127.586%; background-image: url(${ avatar });">
                                        <picture style="display: none;">
                                            <source
                                                data-srcset="${ avatar }"
                                                sizes="270px"
                                                srcset="${ avatar }">
                                            <img alt="" class="lazyautosizes lazyloaded" data-sizes="auto"
                                                 data-ratio="0.7837837837837838" sizes="270px"></picture>
                                    </div>
                                </div>
                                            <div class="hover_button op__0 tc pa flex column ts__03">
                                                <a href="javascript:void(0)" data-id="4540696920203" onclick="jscartdh(${product.id})"
                                                                       class="pr pr_atc cd br__40 bgw tc dib cb chp ttip_nt tooltip_top_left"
                                                                       rel="nofollow"><span class="tt_txt text-capitalize">thêm vào giỏ</span><i
                                                                            class="iccl iccl-cart"></i><span class="text-capitalize">thêm vào giỏ</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                        <div class="product-info mt__15">
                                            <h3 class="product-title pr fs__14 mg__0 fwm">
                                                <a class="cd chp" href="${product.href}">${product.title}</a></h3>
                                            <span class="price dib mb__5">
                                                ${product.price_main != product.price_pay ? '<del class="price_old"> <span class="number_format">' + product.price_main + ' </span> <span class="currency_format">₫</span> </del>' : ''}
                                        <ins>
                                             <span class="number_format">${product.price_pay}</span>
                                               <span class="currency_format">₫</span>
                                        </ins>
                                    </span>
                            </div>
                        </div>
                    </div>
                `;
            }

            console.log(html)
            $('#products').append(html);
        }

    }

    async function getData(page) {
        return await fetch(gks.baseURL + `/san-pham/ajax?page=${page}`)
            .then(response => response.json());
    }

    async function getAvatar(id) {
        try {
            const response = await fetch(gks.baseURL + `/san-pham/${id}/avatar`);
            const data = await response.json()
            return data.avatar;
        }catch(error) {

        }
    }
</script>
