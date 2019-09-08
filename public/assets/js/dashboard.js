function fetchData(url = '/getDashboardData', pivot_ui_type = 'pivotUI') {
  $.getJSON(url, function(data, textStatus, jqXHR) {
    pivotData = data.map((v, k) => flattenObject(v));
    makePivot('#attendance_dashboard', pivotData, pivot_ui_type);
  });
}

function makePivot(selector, data, pivot_ui_type = 'pivot') {
  let pivotConfig = {
    rows: ['student.name'],
    cols: ['date', 'absent_present'],
    rendererName: 'Table',
    // filter: record => {
    //   return record.present == 1;
    // },
    derivedAttributes: {
      absent_present: function(mp) {
        return mp['present'] == '1' ? 'Present' : 'Absent';
      },
      test: function(mp) {
        return mp['present'] == '1' ? 1 : 0;
      }
    }
  };

  if (pivot_ui_type == 'pivotUI') {
    $(selector).pivotUI(data, pivotConfig);
  } else {
    $(selector).pivot(data, pivotConfig);
  }
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

  return toReturn;
}

fetchData('/getDashboardData', 'pivotUI');

///// When user Click On Static Btn then static pivot dashboard created
$('#make_static_pivot').click(e => {
  fetchData('/getDashboardData', 'pivot');
});

///// When user Click On Dynamic Btn then Dynamic pivot dashboard created
$('#make_dynamic_pivot').click(e => {
  fetchData('/getDashboardData', 'pivotUI');
});
