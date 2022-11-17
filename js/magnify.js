var magnifierSize = 250;

var magnification = 4;

function magnifier () {
    thid.magnifyImg = function (ptr, magnification, magnifierSize) {
        var $pointer;
        if (typeof ptr == 'string') {
            $pointer = $(ptr);
        } else if (typeof ptr== "object") {
            $pointer = ptr;
        }

        if(!($pointer.is('img'))){
            alert('object must be image.');
            return false;
        }

        magnification = +(magnification);

        $pointer.hover(function() {
            $(this).css('cursor', 'none');
            $('magnify').show();

            var width = $(this).width();
            var height = $(this).height();
            var src = $(this).attr('src');
            var imagepos = $(this).offset();
            var image = $(this);

            if (magnifierSize == undefined) {
                magnifierSize = '150px';
            }

            $('.magnify').css({
                'backgroun-size' : width * magnification + 'px' + height * magnification + "px",
                'background-image': 'url("'+src+'")',
                'width': magnifierSize,
                'height':magnifierSize
            });

            var magniOffset = + ($('.magnify').width()/2);
            var rightSide = +(imagePos.left + $(this).width());
            var bottomSide = +(imagePos.top + $(this).height());

            $(document).mousemove(function(e){
                if (e.pagex <+(imagePos.left - magnifyOffset / 6) || e.pagex > +(rightSide + magnifyOffset / 6) || 
                e.page < + (imagepos.top - magnifyOffset / 6) || e.pageY > +(bottomSide + magnifyOffset / 6)){
                    $pointer('.magnify').hide();
                    $(document).unbind('mousemove');
                }

                var backgroundPos = "" - ((e.pagex - imagePos.left) * magnification - magnifyOffset) + "px" + - 
                ((e.pageY - imagePos.top) * magnification - magnifyOffset) + "px";
                    $('.magnify').css ({
                        'left': e.pageX - magnifyOffset,
                        'top': e.pageY - magnifyOffset,
                        'background-position': backgroundPos
                    });
            });
        }, function () {

        });

    };

    this.init = function () {
        $('body').prepend('<div class = "magnify"></div>');
    }
    return this.init();
}

var magnify = new magnifier ();
magnify.magnifyImg('img', magnification, magnifierSize);


