
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { createParty } from '../../features/parties/partiesAPI';
import { partiesSelector } from '../../features/parties/partiesSlice';
import { Party } from '../../types-env';
import './addNewParty.scss';
import { partiesCategoriesSelector } from '../../features/party_categories/party_categoriesSlice';
import { getAllCategories } from '../../features/party_categories/party_categoriesAPI';
import { Footer } from '../../components/footer/Footer';

const CreateNewPartyForm = () => {
  const dispatch = useAppDispatch();
  const initialPartyState: Party = {
    party_id: null,
    party_name: '',
    party_date: null,
    party_time:  '',
    party_location:  '',
    party_category_id:  null,
    category_description:  '',
    party_description: '',
    party_price:  null,
    party_image:'',
    party_creator: null,
    things_to_pbring: undefined,
    created_time:new Date()
    
  };
  const [newParty, setNewParty] = useState<Party>(initialPartyState);
  const categories = useAppSelector(partiesCategoriesSelector);

  useEffect(() => {
    dispatch(getAllCategories());
  },[] );

  const handleInputChange = ( e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > )=>{
    const { name, value } = e.target;
    setNewParty({ ...newParty, [name]: value });
  };
  // const parties = useAppSelector(partiesSelector);

  const handleAddParty = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(createParty(newParty));
  };

  return (
    <div>
      <h2>Create New Party</h2>
      <form className='partyForm' onSubmit={handleAddParty}>
        <label>Party Name:</label>
        <input
          type="text"
          name="party_name"
          value={newParty.party_name}
          onChange={handleInputChange}
        />

        <label>Party Date:</label>
        <input
          type="date"
          name="party_date"
          value={newParty.party_date?.toString() || ''}
          onChange={handleInputChange}
        />

        <label>Party Time:</label>
        <input
          type="time"
          name="party_time"
          value={newParty.party_time?.toString() || ''}
          onChange={handleInputChange}
        />

        <label>Party Location:</label>
        <input
          type="text"
          name="party_location"
          value={newParty.party_location}
          onChange={handleInputChange}
        />

        <label>Category Description:</label>
        {categories && (
          <select
            name="party_category_id"
            value={newParty.party_category_id?.toString() || ''}
            onChange={handleInputChange}
          >
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_description}
              </option>
            ))}
          </select>
        )}


        <label>Party Description:</label>
        <textarea
          name="party_description"
          value={newParty.party_description}
          onChange={handleInputChange}
        ></textarea>

        <label>Party Price:</label>
        <input
          type="number"
          name="party_price"
          value={newParty.party_price?.toString() || ''}
          onChange={handleInputChange}
        />

        {/* Add more form fields for other party details */}

        <button className="createPartyBtn" type="submit">Create Party</button>
      </form>


      <Footer />
    </div>
  );
};

export default CreateNewPartyForm;
