$.getJSON('/getDashboardData', function(data, textStatus, jqXHR) {
  flattenObject(data);
  // data = flattenObject(data);
  makePivot('#attendance_dashboard', data);
});

function makePivot(selector, data, uiType = 'pivot') {
  $(selector).pivotUI(data, {
    rows: ['student_id'],
    cols: ['date', 'present'],
    rendererName: 'Table',
    // filter: record => {
    //   return record.present == 1;
    // },
    derivedAttributes: {
      P: function(mp) {
        return mp['present'] == '1' ? 'Present' : 'Absent';
      },
      test: function(mp) {
        return mp['present'] == '1' ? 1 : 0;
      }
    }
  });
}

function flattenObject(data) {
  var toReturn = {};
  for (var i in data) {
    if (!data.hasOwnProperty(i)) continue;
    if (typeof data[i] == 'object') {
      var flatObject = flattenObject(data[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = data[i];
    }
  }

  console.log(toReturn);

  return toReturn;

  // let m = new Map();
  // let arr = new Array(data);
  // console.log(data.flat(Infinity));

  // for (const row of data) {
  //   m.set(row.id, row);
  // }
  // console.log(m);
}
