import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../images/logo.png';
import moment from 'moment';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontSize: 14
  },
  image: {
    width: 190 * 0.6,
    height: 62 * 0.6,
    marginBottom: 30
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    display: 'flex',
    flexDirection: 'column'
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: 1,
    paddingVertical: 5,
  },
  tableHeaderRow: {

    backgroundColor: 'black',
    color: 'white'
  },
  recipient: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
  }
});

// Create Document Component
const Invoice = (props) => {
  const computedContracts = useMemo(() => {
    return props.contracts
      .map(item => {
        const start = moment(item.check_in);
        const end = moment(item.check_out);
        const durationInHours = moment.duration(Math.abs(end.diff(start))).as('hours');
        return (
          {
            id: item.id,
            name: `${item.firstname} ${item.lastname}`,
            start: start.format('MMM Do HH:mm'),
            end: end.format('MMM Do HH:mm'),
            rate: item.rate,
            total: item.rate * durationInHours
          })
      })
  }, [props.contracts]);

  const total = computedContracts.reduce((a, b) => a + b.total, 0);

  return (
    <PDFViewer height={1200} width={1000}>
      <Document>
        <Page size="Letter" style={styles.page}>
          <View style={styles.section}>
            <Image
              style={styles.image}
              src={Logo}
            />
            <View style={styles.header}>

              <View style={styles.recipient}>
                <Text>{props.contracts[0].firstname}</Text>
                <Text>{props.contracts[0].address}</Text>

              </View>

              <View style={styles.rightTop}>
                <Text>From:</Text>
                <Text>{props.fromDate.format('ddd Do of MMM, LT')}</Text>
                <Text>To:</Text>
                <Text>{props.toDate.format('ddd Do of MMM, LT')}</Text>
              </View>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableHeaderRow, styles.tableRow]}>
                <Text style={{ color: 'white', flexBasis: '5%' }}>#</Text>
                <Text style={{ color: 'white', flexBasis: '25%' }}>Worker Name</Text>
                <Text style={{ color: 'white', flexBasis: '25%' }}>From</Text>
                <Text style={{ color: 'white', flexBasis: '25%' }}>To</Text>
                <Text style={{ color: 'white', flexBasis: '10%' }}>Rate</Text>
                <Text style={{ color: 'white', flexBasis: '10%' }}>Total</Text>
              </View>
              {computedContracts
                .map(item => {
                  return (
                    <View style={styles.tableRow}>
                      <Text style={{ flexBasis: '5%' }}>{item.id}</Text>
                      <Text style={{ flexBasis: '25%' }}>{item.name}</Text>
                      <Text style={{ flexBasis: '25%' }}>{item.start}</Text>
                      <Text style={{ flexBasis: '25%' }}>{item.end}</Text>
                      <Text style={{ flexBasis: '10%' }}>${item.rate}</Text>
                      <Text style={{ flexBasis: '10%' }}>${item.total}</Text>
                    </View>)
                })}

              <View style={[styles.tableRow, { border: 'none' }]}>
                <Text style={{ flex: 1 }} />
                <Text style={{ paddingRight: 10, paddingVertical: 10, borderTop: 2 }}>Total</Text>
                <Text style={{ flexBasis: '20%', borderTop: 2, paddingVertical: 10 }}>${total}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer >
  )
}


export default Invoice;