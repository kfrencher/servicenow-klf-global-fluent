// @ts-ignore
function KLF_JasmineTest(outputs, steps, params, stepResult, assertEqual) {
    var customMatchers = {
        toBeAFunction: function() {
            return {
                /**
                 * @param {any} actual 
                 * @param {any} expected
                 */
                compare: function(actual, expected) {
                    return {
                        pass: typeof actual === 'function',
                        message: 'Expected ' + actual + ' to be a function'
                    };
                }
            };
        }
    };


    describe("spy", function() {
        beforeAll(function() {
            jasmine.addMatchers(customMatchers);
        });

        it("should call the callback", function() {
            var spy = jasmine.createSpy();
            spy();
            expect(spy).toHaveBeenCalled();
        });

        it("should call the spy gs.log instead of gs.log", function() {
            var logger = {
                log: function() {
                    gs.log('Calling fake function', 'KLF_JasmineTest');
                }
            };
            spyOn(logger, "log").and.callFake(function() {
                gs.log('Calling fake function', 'KLF_JasmineTest');
            });
            spyOn(gs, "info").and.callFake(function() {
                gs.log('Calling fake function', 'KLF_JasmineTest');
            });
            logger.log();
        });

        it("should call the spy function instead of the script include function object", function() {
            spyOn(x_912467_klf.DateUtils, "getFiscalYear").and.callFake(function() {
                return 2021;
            });

            expect(x_912467_klf.DateUtils.getFiscalYear(new GlideDateTime())).toBe(2021, 'Fiscal year is correct');
        });

        it("should call the spy class function instead of the script include function", function() {
            var expectedGlideRecord = new GlideRecord('task');

            spyOn(global.KLF_GroupUtils.prototype, "getGroupByName").and.callFake(function() {
                return expectedGlideRecord;
            });

            const groupUtils = new global.KLF_GroupUtils();
            const actualResult = groupUtils.getGroupByName('Test Group');

            expect(global.KLF_GroupUtils.prototype.getGroupByName).toHaveBeenCalled();
            expect(actualResult).toBe(expectedGlideRecord, 'Group is correct');
        });

        it("should have the mock date instead of the current date", function() {
            var date = new Date(2021, 9, 1);
            jasmine.clock().mockDate(date);

            expect(new Date()).toBeEqual(date);

            // Standard display of GlideDateTime: 2024-08-18 10:09:30
            // mock the date to 2024-08-18 10:09:30
            var expectedDateTime = '2024-08-18 10:09:30';

            function GlideDateTime() {}
            GlideDateTime.prototype = {
                getDisplayValue: function() {
                    return expectedDateTime;
                }
            };

            // @ts-ignore
            var getDisplayvalue = spyOn(GlideDateTime.prototype, "getDisplayValue").and.callThrough();

            var dateTime = new GlideDateTime();

            gs.log('DateTime: ' + dateTime.getDisplayValue(), 'KLF_JasmineTest');
            expect(dateTime.getDisplayValue()).toBeEqual(expectedDateTime);
            expect(dateTime.getDisplayValue).toHaveBeenCalled();
            // @ts-ignore
            expect(GlideDateTime.prototype.getDisplayValue).toHaveBeenCalled();
        });

        it('should have normal datetime', function() {
            var date = new GlideDateTime();

            gs.log('Date: ' + date.getDisplayValue(), 'KLF_JasmineTest');
            expect(date.getDisplayValue()).not.toBe('2024-08-18 10:09:30', 'Date is correct');
        });

        it('should be equal to anything', function() {
            expect(1).toBeEqual(jasmine.anything(), '1 is anything');
            expect([1, 2, 3]).toBeEqual(jasmine.arrayContaining([1, 2]));
        });

        it('should be a number', function() {
            expect(1).toBeEqual(jasmine.any(Number), '1 is a number');
        });

        it('should be a boolean', function() {
            expect(true).toBeBoolean();
        });
    });

}