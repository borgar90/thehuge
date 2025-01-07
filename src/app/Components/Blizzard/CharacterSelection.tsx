

import React, { useEffect, useState } from 'react';
import { Character, ProfileData, wow_account } from '@/types';
import {Select, SelectItem} from "@nextui-org/select";
import {Textarea} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  return (
    <div className="character-card card p-4 bg-gray-100 border border-gray-300 rounded-lg w-60">
      <h2 className="text-xl font-bold">{character.name}</h2>
      <p>Level: {character.level}</p>
      <p>Class: {character.playable_class.name}</p>
      <p>Race: {character.playable_race.name}</p>
      <p>Realm: {character.realm.name}</p>
      <button 
      className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      onClick={() => onSelect(character)}>Select</button>

      
    </div>
  );
};




export function WhyJoin() {
  return (
    <Textarea
      isRequired
      className="max-w-xs"
      label="Description"
      labelPlacement="outside"
      placeholder="Enter your description"
    />
  );
}


export const IsMain = () => {
  return (
    <>
      <h3 className="text-xl font-bold">Is this your main character?</h3>
      <Switch defaultSelected size="lg">
          Is this your main character?
      </Switch>
    </>
  );
}


const CharacterSelection = () => {
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/blizzard/profile');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if(data?.wow_accounts?.length != 0) {
          const wowAccounts = data?.wow_accounts;
          let allCharacters:Character[] = [];
          wowAccounts.forEach((account: wow_account) => {
            if(account.characters) {
              console.log('Profile data:', account.characters);
              allCharacters = [...account.characters, ...allCharacters];
            } 
          });
          setProfileData({characters: allCharacters});
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="character-selection p-4">
    {profileData && profileData.characters && (
      <div className="flex flex-wrap gap-4 justify-center">

      <Select className="max-w-[1000px]" label="Main Character" placeholder="Select your main character" >
        {profileData.characters.map((character) => (
          <SelectItem  key={character.id}>{character?.name} - lvl {character.level} {character.playable_class.name}</SelectItem>
        ))}
      </Select>
   
      </div>
    )}
  </div>
  );
};



export default CharacterSelection;