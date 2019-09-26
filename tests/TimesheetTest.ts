import {Summarizer} from "../src/classes/classes";

describe('timesheet', function(){
  describe('ctor', function(){
    describe('rows', function(){
      var legitStartDate = "9/8/2019";
      var legitEndDate = "10/1/2019";
      var legitTodayDate = "9/30/2019";

      it('throws an exception with null rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(null, legitStartDate, legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");
      });

      it('throws an exception with undefined rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(undefined, legitStartDate, legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("Must supply a timesheet rows list.");        
      });

      it('throws an exception with empty rows list', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(new Array<Summarizer.TimesheetRow>(), legitStartDate, legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet rows list is empty.");
      });
    });

    describe('timesheet start date', function(){
      var legitTimesheetRowList = new Array<Summarizer.TimesheetRow>();
      legitTimesheetRowList.push(new Summarizer.TimesheetRow(Summarizer.ProjectType.Bench, new Array<Summarizer.DateEntry>()));
      const legitEndDate = "10/1/2019";
      const legitTodayDate = "9/30/2019";


      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, null, legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, undefined, legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, "", legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, "    ", legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, "abcd", legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          
          new Summarizer.Timesheet(legitTimesheetRowList, "2009-12-31", legitEndDate, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet start date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, "2010-01-01", legitEndDate, legitTodayDate);          
          new Summarizer.Timesheet(legitTimesheetRowList, "1/1/2010", legitEndDate, legitTodayDate);
          new Summarizer.Timesheet(legitTimesheetRowList, "9/8/2019", legitEndDate, legitTodayDate);
        }
        expect(shouldBeFine).not.toThrowError();
      });
    });

    describe('timesheet end date', function(){
      var legitTimesheetRowList = new Array<Summarizer.TimesheetRow>();
      legitTimesheetRowList.push(new Summarizer.TimesheetRow(Summarizer.ProjectType.Bench, new Array<Summarizer.DateEntry>()));
      const legitStartDate = "2019-09-01";
      const legitTodayDate = "9/30/2019";

      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, null, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, undefined, legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "", legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "    ", legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "abcd", legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "2009-12-31", legitTodayDate);
        }

        expect(shouldBlowUp).toThrowError("timesheet end date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "01-01-2010", legitTodayDate);          
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "01/01/2010", legitTodayDate);
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, "9/8/2019", legitTodayDate);
        }
        expect(shouldBeFine).not.toThrowError();
      });
    })
    describe("today's date", function(){
      var legitTimesheetRowList = new Array<Summarizer.TimesheetRow>();
      legitTimesheetRowList.push(new Summarizer.TimesheetRow(Summarizer.ProjectType.Bench, new Array<Summarizer.DateEntry>()));
      const legitStartDate = "2019-09-01";
      const legitEndDate = "2019-09-10";

      it('throws an error when null', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, null);
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when undefined', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, undefined);
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when empty', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "");
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when whitespace', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "    ");
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when non-formatted date', function(){
        var shouldBlowUp = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "abcd");
        }

        expect(shouldBlowUp).toThrowError("today's date is invalid.");
      });

      it('throws an error when given a date before 2010', function(){
        // This is just to ensure people are using it for recent timesheets; we introduced this in 2018.
        var shouldBlowUp = function(){
          
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "2009-12-31");
        }

        expect(shouldBlowUp).toThrowError("today's date should be after 2009.");
      });

      it('is fine with a valid date', function(){
        var shouldBeFine = function(){
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "01-01-2010");          
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "01/01/2010");
          new Summarizer.Timesheet(legitTimesheetRowList, legitStartDate, legitEndDate, "9/8/2019");
        }
        expect(shouldBeFine).not.toThrowError();
      });
    })
  })
});
// TODO: Today's date  (needs it to evaluate whether this is an old timesheet or has time left)
// TODO: Latest timesheet entry date
// TODO: Total + Hours
// TODO: Total Non + Hours
// TODO: Tracking