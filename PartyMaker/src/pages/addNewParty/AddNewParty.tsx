
//add party tsx client side 
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { createParty, saveImgtoDB } from '../../features/parties/partiesAPI';
import { Party } from '../../types-env';
import './addNewParty.scss';
import { partiesCategoriesSelector } from '../../features/party_categories/party_categoriesSlice';
import { getAllCategories } from '../../features/party_categories/party_categoriesAPI';
import { userSelector } from '../../features/loggedInUser/userSlice';
import NavBar from '../../components/navBar/NavBar';
import { Footer } from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { partiesImgIdSelector } from '../../features/parties/partiesSlice';

const CreateNewPartyForm = () => {
  const createdDate = new Date();
  const dispatch = useAppDispatch();
  const navigate= useNavigate();
  const [file, setFile] = useState<File>();
  const user=useAppSelector(userSelector)
  const img_id=useAppSelector(partiesImgIdSelector)
  // const [file, setFile] = useState<File>();  
  const initialPartyState: Party = {
    party_id: null,
    party_name: '',
    party_date: null,
    party_location:  '',
    party_category_id:  null,
    category_description:  '',
    party_description: '',
    party_price:  null,
    party_image_id:1,
    party_creator_id: user? user.user_id: null,
    things_to_bring: "nothing",
    // created_time: `${createdDate.getDate}`
    created_time:`${createdDate.getFullYear()}-${createdDate.getMonth()+1}-${createdDate.getDate()}`,       
  };
  const [newParty, setNewParty] = useState<Party>(initialPartyState);
  const categories = useAppSelector(partiesCategoriesSelector);

  useEffect(() => {
    dispatch(getAllCategories());
  },[] );
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFile(file);
  }

  const handleInputChange = ( e: React.ChangeEvent< HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement > )=>{
    const { name, value } = e.target;
    setNewParty({ ...newParty, [name]: value });
  };
  // const parties = useAppSelector(partiesSelector);

  const handleAddParty = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      if (!user) throw new Error('You must be logged in to create a party');
      if (!file) throw new Error('You must upload an image');
  
      const formData = new FormData();
      formData.append('file', file);

    const response = await dispatch(saveImgtoDB(formData));
   // Access img_id after the Promise has resolved
   const img_id = (response.payload as { img_id: number }).img_id || null;
    
    if (!img_id ) {
      throw new Error('Error saving image to DB');
    }
      const updatedParty = { ...newParty, party_creator_id: user.user_id, party_image_id: img_id };
  
      await dispatch(createParty(updatedParty));
  
      // setNewParty(initialPartyState);
      // setFile(undefined);
      alert('Party created successfully');
      navigate('/partyPage');
    } catch (error) {
      console.error(error);
    }
  };
  
  
  

  return (
    <div>
      <NavBar/>
      
      <form className='partyForm' onSubmit={handleAddParty}>
      <h2 className='createPartyTitle'>Create New Party</h2>
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

        {/* <label>Party Time:</label>
        <input
          type="time"
          name="party_time"
          value={newParty.party_time?.toString() || ''}
          onChange={handleInputChange}
        /> */}

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
          className='select'
            name="party_category_id"
            value={newParty.party_category_id?.toString() || ''}
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
        className='bring'
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
        <label>Add Image Party:</label>
        <input type="file"
         name="file"
         onChange={handleFileChange}
        />
        <label>Things to Bring:</label>
        <textarea
        className='bring'
          name="things_to_bring"
          value={newParty.things_to_bring}
          onChange={handleInputChange}
        ></textarea>

        <button className="createPartyBtn" type="submit">Create Party</button>
      </form>


      {/* <Footer /> */}
    </div>
  );
};

export default CreateNewPartyForm;
