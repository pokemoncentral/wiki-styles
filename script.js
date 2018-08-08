-function($){

$(function() {
    ['tiny', 'small', 'medium', 'large', 'huge'].forEach(size => {
        const className = size + '-spacing';
        var wrappers = $(`.${ className }`);
        const items = wrappers.find('> *, td, th')
            .add(`.${ className }-item`);
        wrappers = wrappers.filter(':not(table)');

        $(`[name="${ className }"]`).change(function() {
            const val = $(this).val()
                .replace(/[\d\.]+/, n => parseFloat(n) / 2);

            wrappers.css({margin: `-${ val }`});
            items.css({padding: val});
        })
    });
});

}(jQuery);
