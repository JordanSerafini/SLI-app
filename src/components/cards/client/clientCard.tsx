function ClientCard({
    id,
    maininvoicingcontact_firstname,
    maininvoicingcontact_name,
    maininvoicingcontact_phone,
    maininvoicingaddress_address1,
    maininvoicingaddress_address2,
    maininvoicingaddress_address3,
    maininvoicingaddress_zipCode,
    maininvoicingaddress_city,
    maininvoicingaddress_state,
    name,
    css,
    onDetailClick
  }: {
    id: string,
    maininvoicingcontact_name: string,
    maininvoicingcontact_firstname: string,
    maininvoicingcontact_phone: string,
    maininvoicingaddress_address1: string,
    maininvoicingaddress_address2: string,
    maininvoicingaddress_address3: string,
    maininvoicingaddress_zipCode: string,
    maininvoicingaddress_city: string,
    maininvoicingaddress_state: string,
    css: string,
    name: string,
    accounts_account: string,
    onDetailClick: (id: string) => void
  }) {

    const FullName = `${maininvoicingcontact_firstname} ${maininvoicingcontact_name}`;
    const buildAddress = () => {
      const parts = [
        maininvoicingaddress_address1,
        maininvoicingaddress_address2,
        maininvoicingaddress_address3,
        maininvoicingaddress_zipCode,
        maininvoicingaddress_city,
        maininvoicingaddress_state,
      ];
      return parts.filter(part => part).join(' ');
    };
  
    const address = buildAddress();  


    return (
      <div className={`card ${css}`} onClick={() => onDetailClick(id)}>
        
        <div className="card-body overflow-auto">
          <p>{name}</p>
          <h2 className="card-title text-sm">{FullName}</h2>
            <div className="flex justify-end">{maininvoicingcontact_phone}</div>
          <div className="flex justify-end">{address}</div>
        </div>
      </div>
    );
  }
  
  export default ClientCard;
  