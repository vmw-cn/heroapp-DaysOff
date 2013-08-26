define(["pages/home/about/aboutTemplate", "pages/home/about/aboutBody.html"], function (AboutView, jade) {
    return AboutView.extend({
        contentTemplate: jade,
        contentTitle: "About Us | Tmpst",
        contentClass: ".about"
    });
});