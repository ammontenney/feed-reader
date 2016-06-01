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
        it('should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and ensure it
         * has a URL defined and that the URL is not empty.
         */
        it('should have a URL', function(){
            for (var i=0; i<allFeeds.length; i++){
                expect(typeof allFeeds[i].url).not.toBe('undefined');
                expect(allFeeds[i].url).toBeTruthy();
                expect(allFeeds[i].url.length).not.toBe(0);
                // TODO: verify the formatting of the URL
            }
         });

        /* Loop through each feed in the allFeeds object and ensure it has a
         * name defined and that the name is not empty.
         */
        it('should have a name', function(){
            for (var i=0; i<allFeeds.length; i++){
                expect(typeof allFeeds[i].name).not.toBe('undefined');
                expect(allFeeds[i].name).toBeTruthy();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* This test suite makes sure the off-canvas menu works correctly. */
    describe('The menu', function(){
        /* Ensure the menu element is hidden by default. If the class
         * 'menu-hidden' is not present in the DOM then this test fails.
         */
         it('should be hidden by default', function(){
             // if jQuery returns an empty array, then the 'menu-hidden' class
             // has not been applied which means the menu is visible
             var hidden = $('.menu-hidden');
             expect(hidden.length).not.toBe(0);
         });

         /* Ensure the menu changes visibility when the menu icon is clicked. */
        it('should toggle when the menu icon is clicked', function(){
            var oldState, newState;
            var menuIcon = $('.menu-icon-link');

            // With each click the results length of $('.menu-hidden') should change
            oldState = $('.menu-hidden').length;
            menuIcon.click();
            newState = $('.menu-hidden').length;
            expect(newState).not.toBe(oldState);

            oldState = newState;
            menuIcon.click();
            newState = $('.menu-hidden').length;
            expect(newState).not.toBe(oldState);
        });
    });



    /* This suite tests that loadFeed() correctly loads and populates feed entries */
    describe('Initial Entries', function(){
        /* Ensure that when the loadFeed function is called and completes its
         * work, there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            $('.feed').html('');
            loadFeed(0, done);
        });

        it('should show 1 or more entries', function(){
            var entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);

        });
     });

    /* This suite tests to make sure the displayed feed entries change when a
     * new feed is selected.
     */
    describe('New Feed Selection', function(){
        /* Ensure when a new feed is loaded by the loadFeed function that the
         * content actually changes.
         */
        var oldContent = '';
        beforeEach(function(done){
            loadFeed(1, callBack(done));
        });

        function callBack(done){
            return function() {
                oldContent = $('.feed').html();
                loadFeed(2, done);
            };
        }

        it('should show new feed results', function(){
            var newContent = $('.feed').html();
            expect(newContent).not.toEqual(oldContent);
        });
    });

}());
