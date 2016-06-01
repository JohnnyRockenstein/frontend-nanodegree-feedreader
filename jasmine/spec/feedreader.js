/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
            /* This is our first test suite - a test suite just contains
             * a related set of tests. This suite is all about the RSS
             * feeds definitions, the allFeeds variable in our application.
             */
            describe('RSS Feeds', function() {
                /* This is our first test - it tests to make sure that the
                 * allFeeds variable has been defined and that it is not
                 * empty. Experiment with this before you get started on
                 * the rest of this project. What happens when you change
                 * allFeeds in app.js to be an empty array and refresh the
                 * page?
                 */
                it('are defined', function() {
                    expect(allFeeds).toBeDefined();
                    expect(allFeeds.length).not.toBe(0);
                });


                /* Loops through each feed in the allFeeds object and ensures
                 * it has a URL defined and that the URL is not empty.
                 */
                it("contains URL", function() {
                    allFeeds.forEach(function(feed) {
                        expect(feed.url).toBeDefined();
                        expect(feed.url.length).not.toBe(0);
                    });
                });

                /* Loops through each feed in the allFeeds object and ensures it
                 * has a name defined and that the name is not empty.
                 */
                it("has a name", function() {
                    allFeeds.forEach(function(feed) {
                        expect(feed.name).toBeDefined();
                        expect(feed.name.length).not.toBe(0);
                    });
                });
            });


            /* Test suite for the The menu functionality */
            describe("The menu", function() {

                /* Ensures the menu element is hidden by default. */
                it("Menu is hidden by default", function() {
                    expect($('body').hasClass('menu-hidden')).toBeTruthy();
                });

                /* Ensures the menu changes visibility when the menu icon is clicked.
                 * This test has two expectations: does the menu display when
                 * clicked and does it hide when clicked again.
                 */
                it("Menu visibility changes when icon is clicked", function() {
                    $('.menu-icon-link').trigger('click');
                    expect($('body').hasClass('menu-hidden')).toBeFalsy();

                    $('.menu-icon-link').trigger('click');
                    expect($('body').hasClass('menu-hidden')).toBeTruthy();

                });
            });

            /* Entries Test Suite */
            describe("Initial Entries", function() {

                /* Ensures when the loadFeed function is called and completes its work,
                 * there is at least a single .entry element within the .feed container.
                 */

                beforeEach(function(done) {
                    loadFeed(0, done);
                });

                it('has loaded', function(done) {
                    var children = $('.feed').children();
                    var hasChild = false;
                    console.log(children);
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        if ($(child).find('.entry'))
                            hasChild = true;
                    }
                    expect(hasChild).toBe(true);
                    done();
                });
            });

            /* New Feed Selection test Suite */
            describe("New Feed Selection", function() {
                var current;
                var after;

                /* Ensures when a new feed is loaded by the loadFeed function
                 * the content actually changes.
                 */
                beforeEach(function(done) {
                    loadFeed(0 , function() {
                        current = $('.feed').html();

                        loadFeed(1, function() {
                            after = $('.feed').html();
                            done();
                        });
                    });
                });

                it('content updates', function(done) {
                    expect(current != after).toBe(true);
                    done();
                });
            });

}());
