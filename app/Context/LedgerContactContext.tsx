import React, { createContext, SetStateAction, useState } from "react";

const ContactContext = React.createContext<any>({});

function ContactProvider({ children }: any) {
  const [ledgerContacts, setLedgerContacts] = useState([]);
  const val: any = {
    ledgerContactData: ledgerContacts,
    setLedgerData: setLedgerContacts,
  };

  return (
    <ContactContext.Provider value={val}>{children}</ContactContext.Provider>
  );
}

export { ContactProvider, ContactContext };
