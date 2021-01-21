// DATA GENERATION
const _randNum = size => Math.random() * size;
const _generateNum = () => parseFloat((_randNum(89) + 10).toFixed(4));
const _generateCurrency = () => parseFloat((_randNum(89999) + 1000).toFixed(2));

const _generateString = () => {
  var choices = ['apple', 'orange', 'peach', 'banana', 'melon'];
  return choices[Math.round(_randNum(4))];
};

function createRowData(maxRows) {
  rowData = [];
  for (var i = 0; i < maxRows; i++) {
    var row = {
      number: _generateNum(),
      string: _generateString(),
      currency: _generateCurrency(),
    };
    rowData.push(row);
  }
  return rowData;
}

// DATA FORMATTING
function currencyFormatter(currency, sign) {
  var sansDec = currency.toFixed(0);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
}

function stringFormatter(params) {
  var fruit = params.value;
  var firstChar = fruit.slice(0, 1).toUpperCase();
  return firstChar + fruit.slice(1);
}

var gridOptions = {
  columnDefs: [
    {
      field: 'number',
    },
    {
      headerName: 'Number Formatted',
      field: 'number',
      valueFormatter: params => params.data.number.toFixed(2),
    },
    {
      field: 'string',
    },
    {
      headerName: 'String Formatted',
      field: 'string',
      valueFormatter: stringFormatter,
      filter: 'agSetColumnFilter',
      filterParams: {
        valueFormatter: stringFormatter,
      },
    },
    {
      field: 'currency',
    },
    {
      headerName: 'Currency Formatted',
      field: 'currency',
      valueFormatter: params => currencyFormatter(params.data.currency, '$'),
      filter: 'agNumberColumnFilter',
      filterParams: {
        suppressAndOrCondition: true,
        filterOptions: ['greaterThan'],
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
  },
  rowData: createRowData(50),
  suppressMenuHide: true,
};

document.addEventListener('DOMContentLoaded', function() {
  var eGridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(eGridDiv, gridOptions);
});
