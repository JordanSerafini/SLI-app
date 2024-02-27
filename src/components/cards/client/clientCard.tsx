function ClientCard({
    id,
    maininvoicingcontact_firstname,
    maininvoicingcontact_name,
    maininvoicingcontact_phone,
    maindeliverycontact_cellphone,
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
    maindeliverycontact_cellphone: string,
    css: string,
    name: string,
    accounts_account: string,
    onDetailClick: (id: string) => void
  }) {

    const FullName = `${maininvoicingcontact_firstname} ${maininvoicingcontact_name}`;
    
  


    return (
      <div className={`card ${css}`} onClick={() => onDetailClick(id)}>
        
        <div className="card-body overflow-auto flex flex-col">
          <p>{name}</p>
          <h2 className="card-title text-sm">{FullName}</h2>
          {/* Telephone */}
          <div className="flex flex-row justify-evenly">
          <div className="flex justify-end">{maindeliverycontact_cellphone}</div>

            <div className="flex justify-end">{maininvoicingcontact_phone}</div>
            </div>
        </div>
      </div>
    );
  }
  
  export default ClientCard;
  