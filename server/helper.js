const users = [];

export const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

   const existingUser = users.find((user) => user.room === room && user.name === name);

   if(existingUser) {
       return {error :'This username is already taken'}
   }

   const user = {id, name, room}
   users.push(user)

   return { user }
};

export const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if(index !== -1) {
        return users.splice(index,1)[0] //to vraca splajsovanog usera
    }
};

export const getUser = (id) => {
   const user = users.find((user) => user.id === id )
   return user
};

export const getSpecificUsers = (room) => {
    let specUser = users.filter((user) => user.room === room)
    return specUser
};
