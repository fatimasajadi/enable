import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Logo from '../images/logo.png';
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
const Invoice = () => {
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
                <Text>John Smith</Text>
                <Text>46 Eric</Text>
                <Text>St. John's, NL, A1E 4K4</Text>
              </View>

              <View style={styles.rightTop}>
                <Text>From:</Text>
                <Text>April 17, 2020</Text>
                <Text>To:</Text>
                <Text>August 27, 2020</Text>
              </View>
            </View>
            <View style={styles.table}>
              <View style={[styles.tableHeaderRow, styles.tableRow]}>
                <Text style={{ color: 'white', flexBasis: '16%' }}>Number</Text>
                <Text style={{ color: 'white', flexBasis: '64%' }}>Name</Text>
                <Text style={{ color: 'white', flexBasis: '20%' }}>Amount</Text>
              </View>
              {[
                {
                  id: 1,
                  name: 'Akbar',
                  amount: 20
                },
                {
                  id: 1,
                  name: 'Asqar',
                  amount: 20
                },
                {
                  id: 1,
                  name: 'Sadat',
                  amount: 20
                }
              ].map(item => {
                return (
                  <View style={styles.tableRow}>
                    <Text style={{ flexBasis: '16%' }}>{item.id}</Text>
                    <Text style={{ flexBasis: '64%' }}>{item.name}</Text>
                    <Text style={{ flexBasis: '20%' }}>{item.amount}</Text>
                  </View>)
              })}

              <View style={[styles.tableRow, { border: 'none' }]}>
                <Text style={{ flex: 1 }} />
                <Text style={{ paddingRight: 10, paddingVertical: 10, borderTop: 2 }}>Total</Text>
                <Text style={{ flexBasis: '20%', borderTop: 2, paddingVertical: 10 }}>{102}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer >
  )
}


export default Invoice;