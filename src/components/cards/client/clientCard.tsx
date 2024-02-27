import telLogo from '../../../assets/telLogo.png';

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
  maininvoicingcontact_firstname: string,
  maininvoicingcontact_name: string,
  maininvoicingcontact_phone: string,
  maindeliverycontact_cellphone: string,
  name: string,
  css: string,
  onDetailClick: (id: string) => void
}) {

  const getFullName = (firstname: string, lastname: string) => {
    return [firstname, lastname].filter(Boolean).join(' ').trim();
  };

  const FullName = getFullName(maininvoicingcontact_firstname, maininvoicingcontact_name);

  const PhoneLink = ({ phone }: { phone: string }) => {
    return phone ? (
      <a href={`tel:${phone}`} className="flex items-center justify-end no-underline text-black">
        <img src={telLogo} alt="Phone" className="mr-2 h-4 " />
        {phone}
      </a>
    ) : null;
  };

  return (
    <div className={`card ${css}`} onClick={() => onDetailClick(id)}>
      <div className="card-body overflow-auto flex flex-col">
        <p>{name}</p>
        {FullName && <h2 className="card-title text-sm">{FullName}</h2>}
        <div className="flex flex-row justify-evenly">
          <PhoneLink phone={maindeliverycontact_cellphone} />
          <PhoneLink phone={maininvoicingcontact_phone} />
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
