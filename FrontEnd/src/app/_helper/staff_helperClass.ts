import * as moment from "moment";

export class StaffHelperClass {


static  staffReport(obj) {

    var report = {
        content: [
            {
              columns: [
                {
                  image:
                    'data:image/png;base64,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',width: 150,
                },
                [
                  {
                    text: 'Staff Report',
                    color: '#333333',
                    width: '*',
                    fontSize: 28,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 15],
                  },
                  {
                    stack: [
                      {
                        columns: [
                          {
                            text: 'Staff No.',
                            color: '#aaaaab',
                            bold: true,
                            width: '*',
                            fontSize: 12,
                            alignment: 'right',
                          },
                          {
                            text: obj?.id,
                            bold: true,
                            color: '#333333',
                            fontSize: 12,
                            alignment: 'right',
                            width: 100,
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: 'Date Issued',
                            color: '#aaaaab',
                            bold: true,
                            width: '*',
                            fontSize: 12,
                            alignment: 'right',
                          },
                          {
                            text: moment(obj.createdDate).format('YYYY-MM-DD'),
                            bold: true,
                            color: '#333333',
                            fontSize: 12,
                            alignment: 'right',
                            width: 100,
                          },
                        ],
                      },
                      {
                        columns: [
                          {
                            text: 'Status',
                            color: '#aaaaab',
                            bold: true,
                            fontSize: 12,
                            alignment: 'right',
                            width: '*',
                          },
                          {
                            text: (obj.staffStatus == true)?'Active':'Inactive',
                            bold: true,
                            fontSize: 14,
                            alignment: 'right',
                            color:  (obj.staffStatus == true)?'green':'red',
                            width: 100,
                          },
                        ],
                      },
                    ],
                  },
                ],
              ],
            },
            '\n\n','\n\n',
            {
              columns: [
                {
                  text: 'Address',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },
                {
                  text: 'Company Number',
                  color: '#aaaaab',
                  bold: true,
                  margin: [3, 8, 1, 6],
                },

              ],
            },
              {
              columns: [
                {
                  text: 'NO,204/A ST, JOSEPH STREET, NEGOMBO.',
                  style: 'invoiceBillingAddress',
                },
                {
                  text: '0777367446',
                  style: 'invoiceBillingAddress',
                },
              ],
            },
             {
              columns: [
                  {
                  text: 'Staff Name',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },
                {
                  text: 'NIC Number',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },

              ],
            },



            {
              columns: [
                {
                  text: obj?.firstName +" "+ obj?.lastName,
                  style: 'invoiceBillingAddress',
                },
                {
                  text: obj?.nicNumber,
                  style: 'invoiceBillingAddress',
                },

              ],
            },
               {
              columns: [
                  {
                  text: 'email address',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },
                {
                  text: 'Driving Liesence',
                  color: '#aaaaab',
                  bold: true,
                  margin: [0, 7, 0, 3],
                },

              ],
            },
            {
              columns: [
                {
                  text: obj?.email,
                  style: 'invoiceBillingAddress',
                },
                {
                  text: obj?.drvinLno,
                  style: 'invoiceBillingAddress',
                },
              ],
            },
            {
                columns: [
                {
                    text: 'Birth Day',
                    color: '#aaaaab',
                    bold: true,
                    margin: [0, 7, 0, 3],
                  },

                ],
            },
            {
                columns: [
                  {
                    text: obj?.birthday,
                    style: 'invoiceBillingAddress',
                },


            ],
          },

            '\n\n',

            {
              layout: {
                defaultBorder: false,
                hLineWidth: function(i, node) {
                  return 1;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  if (i === 1 || i === 0) {
                    return '#bfdde8';
                  }
                  return '#eaeaea';
                },
                vLineColor: function(i, node) {
                  return '#eaeaea';
                },
                hLineStyle: function(i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function(i, node) {
                  return 10;
                },
                paddingRight: function(i, node) {
                  return 10;
                },
                paddingTop: function(i, node) {
                  return 2;
                },
                paddingBottom: function(i, node) {
                  return 2;
                },
                fillColor: function(rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['*', 80],
                body: [


                  [

                  ],
                ],
              },
            },
            '\n',
            '\n\n',
            {
              layout: {
                defaultBorder: false,
                hLineWidth: function(i, node) {
                  return 1;
                },
                vLineWidth: function(i, node) {
                  return 1;
                },
                hLineColor: function(i, node) {
                  return '#eaeaea';
                },
                vLineColor: function(i, node) {
                  return '#eaeaea';
                },
                hLineStyle: function(i, node) {
                  // if (i === 0 || i === node.table.body.length) {
                  return null;
                  //}
                },
                // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                paddingLeft: function(i, node) {
                  return 10;
                },
                paddingRight: function(i, node) {
                  return 10;
                },
                paddingTop: function(i, node) {
                  return 3;
                },
                paddingBottom: function(i, node) {
                  return 3;
                },
                fillColor: function(rowIndex, node, columnIndex) {
                  return '#fff';
                },
              },
              table: {
                headerRows: 1,
                widths: ['*', 'auto'],
                body: [


                  [

                  ],
                ],
              },
            },
            '\n\n',

          ],
          styles: {
            notesTitle: {
              fontSize: 10,
              bold: true,
              margin: [0, 50, 0, 3],
            },
            notesText: {
              fontSize: 10,
            },
          },
          defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
          },
        };
        return report;
}

}
