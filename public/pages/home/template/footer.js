define(['jquery', 'underscore', 'backbone', 'js/app/home', 'pages/home/template/footer.html'], function ($, _, Backbone, Tmpst, FooterTemplate) {
    var FooterView = Backbone.View.extend({
        name: 'footer',
        id: 'footer',
        tagName: 'footer',
        className: 'pure-u-1',
        render: function () {
            this.$el.html(FooterTemplate({
                config: Tmpst.config
            }));

            return this;
        }
    });

    return FooterView;
});