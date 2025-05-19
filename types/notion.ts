export type Property = {
    id?: string;
    type?: string;
    [key: string]: any;
  };
  
export type TBlogResult = {
    object: "page";
    id: string;
    created_time: string;
    last_edited_time: string;
    created_by: { object: "user"; id: string };
    last_edited_by: { object: "user"; id: string };
    cover:
      | { type: "file"; file: { url: string } }
      | { type: "external"; external: { url: string } }
      | null;
    icon: { type: "emoji"; emoji: string } | null;
    parent: {
      type: "database_id";
      database_id: string;
    };
    archived: boolean;
    in_trash: boolean;
    properties: {
      date: Property;
      publish: Property;
      "sub-title": Property;
      updated_at: Property;
      category: Property;
      thumbnail: Property;
      title: Property;
      [key: string]: Property;
    };
    url: string;
    public_url: string | null;
  };
  