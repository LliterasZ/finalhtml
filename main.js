//Component for the famous people
Vue.component(`personcard`,{
    template: 
    `
    <div>
        <p>{{name}}</p>
        <p>{{bio}}</p>
        <div>
            <img :src=img alt=""></img>
        </div>
        <button type="button" class="btn btn-primary" @click=getDetails(id)>Learn More</button>
    </div>
    `,
    //nessisary props
    props: ['name', 'id'],
    //allows for the component to change the two values it's self without risking mutating the whole thing.
    data: function(){
        return{
            bio: " ",
            img: " ",
        }
    },
    methods: {
        //gets the bio and img details from the api call
        getDetails(e){
            //api call using e as the variable for the person ID
            axios.get(`https://api.themoviedb.org/3/person/${e}?api_key=42a27de7e77847acbe1afb1f4910df20&language=en-US`)
            .then((response)=>{
                //sets the two data bits that we needed from the api call
            this.bio = response.data.biography;
            this.img = `https://image.tmdb.org/t/p/w200${response.data.profile_path}`;
        })
        }
    },
    
  })

//new vue instance
var vue = new Vue({
    //designates the id of the div this vue instance will be affecting  
    el: '#app',
    data: {
        //the empty array that will hold the people we call with the api
        People: [ ],
    },
    mounted(){
        //api call
        axios.get("https://api.themoviedb.org/3/person/popular?api_key=42a27de7e77847acbe1afb1f4910df20&language=en-US&page=1")
        .then((response)=>{
            //pushes all parts of the called array too the empty people array
            for(i = 0; i < response.data.results.length; i++){
                this.People.push(response.data.results[i]);
            }
        })
    },
  }) 