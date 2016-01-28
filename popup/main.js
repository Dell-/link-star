jQuery(document).ready(function ($) {
    'use strict';

    var rating = {
            title: chrome.i18n.getMessage('linkTitle'),
            pageLink: ko.observable(''),
            value: ko.observable(3),
            current: ko.observable(),
            ratingTitle: ko.observable(),
            stars: []
        };
    rating.overHandler = function (target) {
        this.current(target.rating)
    }.bind(rating);
    rating.outHandler = function () {
        this.current(rating.value())
    }.bind(rating);
    rating.clickHandler = function (target) {
        this.value(target.rating);
    }.bind(rating);

    for (var itemRating = 1; itemRating <= 5; ++itemRating) {
        rating.stars[itemRating - 1] = {
            rating: itemRating,
            active: ko.observable(false),
            name: chrome.i18n.getMessage('ratingTitle', [itemRating])
        };
    }

    rating.current.subscribe(function (value) {
        this.ratingTitle(this.stars[value - 1].name);
        for (var index = 0, length = this.stars.length; index < length; ++index) {
           this.stars[index].active(this.stars[index].rating <= value);
        }
    }.bind(rating));

    rating.value.subscribe(function (value) {
        this.current(value);
    }.bind(rating));

    chrome.tabs.getSelected(null, function (tab) {
        this.pageLink(tab.url);
    }.bind(rating));

    rating.current(rating.value());

    ko.applyBindings(rating);
});
