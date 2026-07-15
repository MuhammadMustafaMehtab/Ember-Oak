// Ember & Oak - homepage jQuery
// All the interactive bits for the homepage live here.

$(document).ready(function () {

  // 1. Navbar shrink on scroll
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.c-nav').addClass('scrolled');
    } else {
      $('.c-nav').removeClass('scrolled');
    }
  });


  // 2. Close mobile menu when a nav link is clicked
  $('.menu-page').on('click', function () {
    if ($('.navbar-collapse').hasClass('show')) {
      $('.navbar-collapse').collapse('hide');
    }
  });


  // 3. Stats counting animation (runs once, when the section comes into view)
  var statsCounted = false;

  function animateStats() {
    if (statsCounted) {
      return;
    }
    statsCounted = true;

    $('.stat-number').each(function () {
      var $this = $(this);
      var target = parseFloat($this.attr('data-target'));
      var suffix = $this.attr('data-suffix') || '';
      var isDecimal = $this.attr('data-decimal') === 'true';

      $({ count: 0 }).animate(
        { count: target },
        {
          duration: 1500,
          easing: 'swing',
          step: function () {
            if (isDecimal) {
              $this.text(this.count.toFixed(1) + suffix);
            } else {
              $this.text(Math.floor(this.count) + suffix);
            }
          },
          complete: function () {
            if (isDecimal) {
              $this.text(target.toFixed(1) + suffix);
            } else {
              $this.text(target + suffix);
            }
          }
        }
      );
    });
  }

  function checkStatsPosition() {
    var section = $('.stats-section');
    if (section.length === 0) {
      return;
    }
    var sectionTop = section.offset().top;
    var scrollBottom = $(window).scrollTop() + $(window).height();

    // trigger a little before the section is fully in view
    if (scrollBottom > sectionTop + 100) {
      animateStats();
    }
  }

  $(window).on('scroll', checkStatsPosition);
  checkStatsPosition(); // in case the section is already visible on load


  // 4. Add to Cart button feedback
  $('.add-cart-btn').on('click', function (e) {
    e.preventDefault();
    var $btn = $(this);

    if ($btn.hasClass('added')) {
      return;
    }

    $btn.addClass('added').text('Added ✓');

    setTimeout(function () {
      $btn.removeClass('added').text('Add To Cart');
    }, 2000);
  });


  // 5. Scroll to top button
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 300) {
      $('#scrollTopBtn').fadeIn(200);
    } else {
      $('#scrollTopBtn').fadeOut(200);
    }
  });

  $('#scrollTopBtn').on('click', function () {
    // the page uses CSS "scroll-behavior: smooth" for anchor links, which
    // fights with jQuery's own scrollTop animation, so it's switched off
    // just for this animation and switched back on once it's done
    var html = document.documentElement;
    var originalBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    $('html, body').animate({ scrollTop: 0 }, 600, function () {
      html.style.scrollBehavior = originalBehavior;
    });
  });


  // 6. Newsletter input - simple validation on Enter key
  $('#newsletterInput').on('keypress', function (e) {
    if (e.which === 13) {
      e.preventDefault();
      var email = $(this).val().trim();

      if (email === '') {
        $('#newsletterMsg').text('Please enter your email address.');
      } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        $('#newsletterMsg').text('Please enter a valid email address.');
      } else {
        $('#newsletterMsg').text('Thank you for subscribing!');
        $(this).val('');
      }
    }
  });

});
