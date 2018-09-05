import { Component } from 'react';

class HandleErrors extends Component {
  static getDerivedStateFromProps(props, state) {
    const { names, sectionErr } = props;
    console.log(props);
    if (names && names.length > 0) {
      // Loop
      Object.keys(names).map(key => {
        const indexName = names[key];
        const input = props[`${indexName}`].input;
        const meta = props[`${indexName}`].meta;
        console.log(indexName);
        console.log(input);
        console.log(meta);
      });
    }
    // const isAllFalse = item => item === false;
    // if (names && names.length > 0) {
    //   // Declase error arrays
    //   const summaryArr = [];
    //   const addressArr = [];
    //   // Loop
    //   Object.keys(names).map(key => {
    //     const indexName = names[key];
    //     const input = props[`${indexName}`].input;
    //     const meta = props[`${indexName}`].meta;

    //     // Summary Error
    //     if (input.name === 'name' || input.name === 'code') {
    //       summaryArr[key] = (meta.touched && meta.error) || false;
    //       sectionErr.summaryErr = !summaryArr.every(isAllFalse);
    //     }
    //     // Contact Info Error, loop throught each section
    //     const isContactSection = input.name === 'addresses' || input.name === 'phone_numbers' || input.name === 'email' || input.name === 'urls';
    //     if (isContactSection) {
    //       if ((meta.error) && meta.error.length > 0) {
    //         const addMetaErr = meta.error;
    //         Object.keys(addMetaErr).map(chkey => {
    //           addressArr[chkey] = addMetaErr[chkey] || false;
    //           return addressArr;
    //         });
    //       }
    //       sectionErr.contactInfoErr = !addressArr.every(isAllFalse) || addressArr.length > 0;
    //     }
    //     // Contact People, Agreements, Accounts Error
    //     if (input.name === 'contacts') sectionErr.contactPeopleErr = ((meta.error) && meta.error.length > 0) || false;
    //     if (input.name === 'agreements') sectionErr.agreementsErr = ((meta.error) && meta.error.length > 0) || false;
    //     if (input.name === 'accounts') sectionErr.accountsErr = ((meta.error) && meta.error.length > 0) || false;
    //     // Return sectionErr
    //     return sectionErr;
    //   });
    // }
    // // Update state
    // if (sectionErr !== state) {
    //   props.updateSectionErrors(sectionErr);
    //   return { ...sectionErr };
    // }
    // return false;
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return false;
  }
}

export default HandleErrors;
