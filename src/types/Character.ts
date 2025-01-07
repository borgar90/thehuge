export default interface Character {
    href: string;
    faction: {
      type: string;
      name: string;
    };
    gender: {
      type: string;
      name: string;
    };
    id: number;
    level: number;
    name: string;
    playable_class: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    playable_race: {
      key: {
        href: string;
      };
      name: string;
      id: number;
    };
    protected_character: {
      href: string;
    };
    realm: {
      key: {
        href: string;
      };
      name: string;
      id: number;
      slug: string;
    };
  }

  