const createEmployeeRecord = (row) => {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = function (employeeRowData) {
  return employeeRowData.map((row) => {
    return createEmployeeRecord(row);
  });
};

const createTimeInEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

const createTimeOutEvent = function (dateStamp) {
  const [date, hour] = dateStamp.split(" ");

  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });

  return this;
};

const hoursWorkedOnDate = function (soughtDate) {
  const inEvent = this.timeInEvents.find(function (e) {
    return e.date === soughtDate;
  });

  const outEvent = this.timeOutEvents.find(function (e) {
    return e.date === soughtDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = function (dateSought) {
  const rawWage = hoursWorkedOnDate.call(this, dateSought) * this.payPerHour;
  return parseFloat(rawWage.toString());
};

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );

  return payable;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find(function (rec) {
    return rec.firstName === firstName;
  });
};

const calculatePayroll = function (arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function (memo, rec) {
    return memo + allWagesFor.call(rec);
  }, 0);
};
