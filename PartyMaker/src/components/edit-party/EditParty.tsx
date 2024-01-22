
//edit party component
import React, { useEffect, useState } from 'react'
import { Party } from '../../types-env';
import './editParty.scss';
import { partiesCategoriesSelector } from '../../features/party_categories/party_categoriesSlice';
import { useAppSelector } from '../../app/hook';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../../features/party_categories/party_categoriesAPI';
import { updatePartyImgAPI } from '../../features/parties/partiesAPI';

interface EditPartyProps {
  party: Party | null;
 
  onSave: (editedParty: Party,fiel ? :File) => void;
  onClose: () => void;
}

const EditParty: React.FC<EditPartyProps> = ({ party, onSave, onClose }) => {
  const dispatch = useDispatch();
  const [editedParty, setEditedParty] = useState({ ...party });
  const [file, setFile] = useState<File>();

  const categories = useAppSelector(partiesCategoriesSelector);
  useEffect(() => {
    dispatch(getAllCategories() as any);
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile(file);
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedParty((prevParty) => ({
      ...prevParty,
      [name]: value === '' ? null : value,
    }));
  };
  const handleSave = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
      if(!editedParty.party_image_id) throw new Error('No party image id');
        await dispatch(updatePartyImgAPI({ formData, party_image_id: editedParty.party_image_id }) as any);
      }
  
      onSave(editedParty as Party, file);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editPartyWrap">
      <h2>Edit Party</h2>
      <div className="editPartyWrap-Details">
        <label>Party Name:</label>
        <input className="editPartyWrap-Details-name"
          type="text"
          name="party_name"
          value={editedParty.party_name}
          onChange={handleInputChange}
        />

        <label>Party Date:</label>
        <input className="editPartyWrap-Details-date"
          type="date"
          name="party_date"
          value={editedParty.party_date?.toString() || ''}
          onChange={handleInputChange}
        />
        <label>Party Location:</label>
        <input
          type="text"
          name="party_location"
          value={editedParty.party_location}
          onChange={handleInputChange}
        />
        <label>Category:</label>
        {categories && (
          <select
            className='select'
            name="party_category_id"
            value={editedParty.party_category_id?.toString() || ''}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option
                key={category.category_id} value={category.category_id}>
                {category.category_description}
              </option>
            ))}
          </select>
        )}

        <label>Party Description:</label>
        <textarea
          className='decribe'
          name="party_description"
          value={editedParty.party_description}
          onChange={handleInputChange}
        ></textarea>

        <label>Party Price:</label>
        <input
          type="number"
          name="party_price"
          value={editedParty.party_price?.toString() || ''}
          onChange={handleInputChange}
        />
        <label>Things to Bring:</label>
        <textarea
          className='bring'
          name="things_to_bring"
          value={editedParty.things_to_bring}
          onChange={handleInputChange}
        ></textarea>
        <label>Add Image Party:</label>
        <input className="file" type="file"
          name="file"
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}


export default EditParty


