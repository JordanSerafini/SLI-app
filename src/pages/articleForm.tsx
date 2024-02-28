import { useState } from "react";
import axios from 'axios';
import url from "../axios/url";

const ArticleForm = () => {
  const [formData, setFormData] = useState({
    caption: "",
    salepriceVatExcluded: "",
    salepricevatincluded: "",
    realStock: "",
    descomclear: "",
    image_url: "",
    realstock: "",
    uniqueid: "",
    familyid: "",
    notesclear: "",
    supplierid: "",
    itemtype: "",
    itemimage: "",
    unitid: "",
  });

  const handleChange = (e: { target: { name: string; value: unknown; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${url.heroku}/insertItem`, formData);
        
        // Réinitialiser le formulaire après la soumission
        setFormData({
            caption: "",
            salepriceVatExcluded: "",
            salepricevatincluded: "",
            realStock: "",
            descomclear: "",
            image_url: "",
            realstock: "",
            uniqueid: "",
            familyid: "",
            notesclear: "",
            supplierid: "",
            itemtype: "",
            itemimage: "",
            unitid: "",
        });

        // Afficher une alerte avec le message de succès
        alert("Article ajouté avec succès!");

        return response.data; // Retourner les données de la réponse après la soumission
    } catch (error: unknown) {
        console.error('Erreur lors de l\'ajout de l\'article:', (error as Error).message);
        
        // Afficher une alerte avec le message d'erreur
        alert("Erreur lors de l'ajout de l'article. Veuillez réessayer plus tard.");

        throw error; // Lancer l'erreur pour la gérer à l'endroit où la fonction est appelée
    }
};


  return (
    <div>
      <h2>Ajouter un nouvel article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caption:</label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sale Price Vat Excluded:</label>
          <input
            type="number"
            name="salepriceVatExcluded"
            value={formData.salepriceVatExcluded}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sale Price Vat Included:</label>
          <input
            type="text"
            name="salepricevatincluded"
            value={formData.salepricevatincluded}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Real Stock:</label>
          <input
            type="text"
            name="realStock"
            value={formData.realStock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="descomclear"
            value={formData.descomclear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Real Stock:</label>
          <input
            type="text"
            name="realstock"
            value={formData.realstock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Unique ID:</label>
          <input
            type="text"
            name="uniqueid"
            value={formData.uniqueid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Family ID:</label>
          <input
            type="text"
            name="familyid"
            value={formData.familyid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes Clear:</label>
          <input
            type="text"
            name="notesclear"
            value={formData.notesclear}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Supplier ID:</label>
          <input
            type="text"
            name="supplierid"
            value={formData.supplierid}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Item Type:</label>
          <input
            type="text"
            name="itemtype"
            value={formData.itemtype}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Item Image:</label>
          <input
            type="text"
            name="itemimage"
            value={formData.itemimage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Unit ID:</label>
          <input
            type="text"
            name="unitid"
            value={formData.unitid}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default ArticleForm;
