function isEmail(email) {
  return /^[a-z0-9._%+-]+@.+\..+/.test(email);
}

function createHash(arr, key) {
  var Hash = function() {
    this.data = {};
    if (arr && Array.isArray(arr)) {
      arr.map(o => {
        this.data[o[key]] = o;
      });
      this.size = arr.length;
    } else {
      this.size = 0;
    }
  };
  Hash.prototype.keys = function() {
    return Object.keys(this.data);
  };
  Hash.prototype.values = function() {
    return Object.values(this.data);
  };

  return new Hash();
}

function getQueryParameters(str) {
  return (str || document.location.search)
    .replace(/(^\?)/, '')
    .split('&')
    .map(
      function(n) {
        return (n = n.split('=')), (this[n[0]] = n[1]), this;
      }.bind({})
    )[0];
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function replaceUrlParam(paramName, paramValue) {
  var url = window.location.href;
  if (paramValue == null) {
    paramValue = '';
  }
  var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
  if (url.search(pattern) >= 0) {
    return url.replace(pattern, '$1' + paramValue + '$2');
  }
  url = url.replace(/[?#]$/, '');
  return (
    url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue
  );
}

$(function() {
  $('#email-subscription-submit').click(function() {
    var email = $('#email-subscription-field').val();
    if (!isEmail(email)) {
      alert('please enter a valid email');
      return;
    }

    function hideResponseMessage() {
      setTimeout(function() {
        $('#email-subscription-success-message').addClass('hidden');
        $('#email-subscription-failure-message').addClass('hidden');
      }, 10000);
    }

    $.ajax({
      type: 'POST',
      url: '/subscription/email-subscribe',
      contentType: 'application/json',
      data: JSON.stringify({
        email: email
      }),
      success: function(data) {
        $('#email-subscription-success-message').removeClass('hidden');
        $('#email-subscription-field').val('');
        hideResponseMessage();
      },
      error: function() {
        $('#email-subscription-failure-message').removeClass('hidden');
        hideResponseMessage();
      }
    });
  });
  
  $('.menu-elm').each(function () {
    var pageUrl = $(this).attr('data-page');
    if (pageUrl === window.location.pathname.replace(/\//g, '')) {
      $(this).addClass('active');
    }
  });
  
  $('.js-user-login').on('click', function() {
    $('.login-form-wrapper').addClass('account--open');
    $('body').addClass('search-opened');
  });
  
});
