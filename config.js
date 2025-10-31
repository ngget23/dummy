// Shared keys and initial seed. Guarded to avoid redefinition across pages.
(function(global){
  if(global.AppKeys) return; // prevent duplicate definition if included twice
  const AppKeys={
    USERS:'studyhub_users_v1',
    SESSION:'studyhub_current_user_v1',
    PRODUCTS:'studyhub_products_v1'
  };

  // Seed default admin if missing
  try{
    const users=JSON.parse(localStorage.getItem(AppKeys.USERS)||'[]');
    const hasAdmin=users.some(u=>u.username==='admin');
    if(!hasAdmin){
      // SHA-256('Admin123!')
      const adminHash='3eb3fe66b31e3b4d10fa70b5cad49c7112294af6ae4e476a1c405155d45aa121';
      const now=new Date().toISOString();
      users.push({username:'admin',name:'Site Admin',email:'admin@example.com',passHash:adminHash,role:'admin',createdAt:now,updatedAt:now});
      localStorage.setItem(AppKeys.USERS,JSON.stringify(users));
    }
  }catch{}

  // Seed basic products if empty
  try{
    const raw=localStorage.getItem(AppKeys.PRODUCTS);
    if(!raw){
      const defaultProducts=[
        {id:'p1',title:'Study Planner Notebook',price:'$7.99',desc:'A printable planner for school.'},
        {id:'p2',title:'Algebra Flashcards',price:'$4.99',desc:'20 cards for quick review.'},
        {id:'p3',title:'Focus Playlist',price:'Free',desc:'Playlist to help concentration.'}
      ];
      localStorage.setItem(AppKeys.PRODUCTS,JSON.stringify(defaultProducts));
    }
  }catch{}

  global.AppKeys=AppKeys;
})(window);
