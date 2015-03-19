// Center modal vertically on page
// http://www.abeautifulsite.net/vertically-centering-bootstrap-modals/
$(function() {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        
        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function() {
        $('.modal:visible').each(reposition);
    });
});

// Modal form submit
$(document).ready(function() {
    var users = {};

    // Load Users and Posts
    $.ajax({
      url: "data/users.json",
      async: false,
      dataType: 'json',
      success: function(data) {
        users = data.slice(0);
        for (var i = 0, len = data.length; i < len; i++) {
          users[data[i].id] = data[i];
        }
      }
    });

    $('.modal_comment').keydown(function(event) {
        if (event.keyCode == 13) {
            var html = [];
            var user = users[5];

            html.push(
              '<div class="row">',
                '<div class="col-sm-12">',
                  '<img src="' + user.pic + '" class="lg-profile-image post-user-img">',
                  '<div class="post-user-name">' + user.username + '</div>',
                  '<div class="post-user-comment">' + this.value + '</div>',
                '</div>',
              '</div>',
              '<div class="row">',
                '<div class="col-sm-11 col-offset-1 pull-right">',
                  '<div class="panel panel-default comment-panel" id="">',
                    '<div class="panel-body">',
                      '<form method="post" action="#" id="cmtform">',
                        '<input type="submit" style="position: absolute; left: -9999px"/>',
                      '</form>',
                      '<textarea rows="1" class="post-comment" form="cmtform" placeholder="post a comment"></textarea>',
                    '</div>',
                  '</div>',
                '</div>',
              '</div>'
            );

            this.value = ''; // Clear input
            $('#post-panel').append(html.join(''));
            $('#myModal').modal('toggle');

            return false;
         }
    });
});