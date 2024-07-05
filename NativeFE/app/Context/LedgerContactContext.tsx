import React, { createContext, SetStateAction, useState } from "react";
import * as Contacts from "expo-contacts";

const ContactContext = React.createContext<any>({});

function ContactProvider({ children }: any) {
  const [ledgerContacts, setLedgerContacts] = useState([]);
  const [allContacts, setAllContacts] = React.useState<Contacts.Contact[]>([]);

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        setAllContacts(data);
      }
    })();
  }, []);

  const val: any = {
    allContactData: allContacts,
    ledgerContactData: ledgerContacts,
    setLedgerData: setLedgerContacts,
  };

  return (
    <ContactContext.Provider value={val}>{children}</ContactContext.Provider>
  );
}

export { ContactProvider, ContactContext };
