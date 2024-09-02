    const apiKey = '3dd820646319423d9237fda25bbb4407';
    const blogContainer = document.getElementById("blog-container");
    const searchfield = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    async function fatchRandomNews(){
        try{
            const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=20&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.articles;
            // console.log(data);
        }
        catch(error){
        console.error("Error fatching from random  news", error);
        return[];
        }
    }   

    searchButton.addEventListener("click", async ()=> {
        const query = searchfield.value.trim()
        if(query !== ""){
            try{
            const articales = await fetchNewsQuery(query)
            displayBlogs(articales)
            }
            catch(error){
                console.error("Error fetching news by query", error);
            }
        }
    })

    async function fetchNewsQuery(query){
        try{
            const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.articles;
            // console.log(data);
        }
        catch(error){
        console.error("Error fatching from random  news", error);
        return[];
        }
    }   

    function displayBlogs(articles){
        blogContainer.innerHTML = "";
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            //  title.textContent = article.title;
            const truncatedTitle = article.title.length>30? article.title.slice(0, 30) + "....." : article.title;
            title.textContent = truncatedTitle;
            const description = document.createElement("p");
            
            const truncatedDec = article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;

            description.textContent = truncatedDec;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            })
            blogContainer.appendChild(blogCard);
        });
    }

    (async () => {
        try{
        const articales  = await fatchRandomNews();
        displayBlogs(articales);
        }
        catch(error){
        console.error("Error fetching random news", error);
        }
    })();
//  Loader 
    window.addEventListener("load", function () {
        // Hide loader after 5 seconds
        setTimeout(function () {
            document.getElementById("loader").style.display = "none";
        }, 5000); // 5000 milliseconds = 5 seconds
    });
    
 //   seahing after click on entter 
        document.getElementById('search-input').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevents the default action (form submission, etc.)
                document.getElementById('search-button').click(); // Simulate the button click
            }
        });

     //   Search Box must be cleasr after done a search item
     // Event listener for search button click
document.getElementById('search-button').addEventListener('click', function() {
    // Add your search logic here
    
    // Clear the input box after searching
    document.getElementById('search-input').value = '';
}); 
    