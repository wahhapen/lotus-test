hljs.initHighlightingOnLoad();

function clipper(min, max) {
  return function(o){
    if(o > max) return max;
    if(o < min) return min;
    return o;
  };
}

var opacityClipper = clipper(0, 1);

var HC_SETTINGS = {
  css: {
    activeClass: 'is-active',
    hiddenClass: 'is-hidden'
  }
};

$(function() {
  var $window = $(window);
  var $heroUnit = $('[data-hero-unit]');
  var $heroUnitBg = $heroUnit.find('[data-hero-bg]');
  var $searchBox = $heroUnit.find('[data-search-box]');
  var $topbar = $('[data-topbar]');
  var topbarHeight = parseInt($topbar.height());
  var $scrollToTop = $('[data-scroll-to-top]');

  $scrollToTop.click(function(){
    $('html, body').animate({ scrollTop: 0}, 1000);
    return false;
  });

  var bindEffects = function() {
    var scrolled = $window.scrollTop();
    if (scrolled > topbarHeight) {
      $scrollToTop.addClass(HC_SETTINGS.css.activeClass);
    } else {
      $scrollToTop.removeClass(HC_SETTINGS.css.activeClass);
    }

    if ($heroUnit.length) {
      $heroUnitBg.css({
        '-moz-transform': 'translate3d(0px,' + scrolled / -3 + 'px' +  ', 0px)',
        '-webkit-transform': 'translate3d(0px,' + scrolled / -3 + 'px' +  ', 0px)',
        'transform': 'translate3d(0px,' + scrolled / -3 + 'px' +  ', 0px)'
      });

      $searchBox.css({
        'opacity': opacityClipper(1 - opacityClipper(scrolled * 0.003))
      });
    }
  };

  $window.on('scroll.theme', bindEffects);

  $('[data-toggle-menu]').click(function(){
    $(this).toggleClass(HC_SETTINGS.css.activeClass);
    $('[data-menu]').toggle();
  });

  // Social share popups
  $('.share a').click(function(e) {
    e.preventDefault();
    window.open(this.href, '', 'height = 500, width = 500');
  });

  // Toggle the share dropdown in communities
  $('.share-label').on('click', function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute('aria-selected') == 'true';
    this.setAttribute('aria-selected', !isSelected);
    $('.share-label').not(this).attr('aria-selected', 'false');
  });

  $(document).on('click', function() {
    $('.share-label').attr('aria-selected', 'false');
  });

  // Submit search on select change
  $('#request-status-select, #request-organization-select')
    .on('change', function() {
      search();
    });

  // Submit search on input enter
  $('#quick-search').on('keypress', function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $('#quick-search').val(),
      status: $('#request-status-select').val(),
      organization_id: $('#request-organization-select').val()
    });
  }

  $('.image-with-lightbox').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.image-with-video-icon').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.accordion__item-title').on('click', function() {
    var $title = $(this);
    $title.toggleClass('accordion__item-title--active');
    $title
      .parents('.accordion__item')
      .find('.accordion__item-content')
      .slideToggle();
  });

  $('.tabs-link').click(function (e) {
    e.preventDefault();
    var $link = $(this);
    var tabIndex = $link.index();
    var $tab = $link.parents('.tabs').find('.tab').eq(tabIndex);
    $link
      .addClass(HC_SETTINGS.css.activeClass)
      .siblings()
      .removeClass(HC_SETTINGS.css.activeClass);
    $tab
      .removeClass(HC_SETTINGS.css.hiddenClass)
      .siblings('.tab')
      .addClass(HC_SETTINGS.css.hiddenClass);
  });

  // Fix animated icons
  $('.fa-spin').empty();
});
