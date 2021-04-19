var checked=1;
var chose=0;
var total_pages=0;
const key="7b8ad4da04305b0003b9bcc7ef0a124e";
function change1()
{
    let a=document.getElementById('navbarDropdown');
    a.innerHTML="Search movies from movies name";
    checked=1;
}
function change2()
{
    let a=document.getElementById('navbarDropdown');
    a.innerHTML="Search movies from actors name";
    checked=2;
}
function loading()
{
    $('#out').empty();
    $('#out').append(`
        <div class="row py-2" id="main">

        </div>
    `)
    $('#pagi').empty();
    $('input').attr('placeholder','Enter keyword here');
    $('#main').append(`
        <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
        </div>
    `);
}
function home()
{
    chose=0;
    document.getElementById('t').innerHTML="Popular movies";
    findPopular(1);
}
function evtSubmit(n)
{
    $(".h3.text-center").empty();
    chose=checked;
    strSearch=$('form input').val();
    if (strSearch=="")
    {
        $('#main').empty();
        $('#pagi').empty();
        $('input').attr('placeholder','You must enter something!');
        return;
    }
    if (chose==1)
    {
        findMovies(n);
    }
    else
    {
        findMovies_Actors(n);
    }
}
async function findPopular(n)
{
    loading();
    const reqStr=`https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=${n}`;
    const response=await fetch(reqStr);
    const rs=await response.json();
    total_pages=parseInt(rs.total_pages,10);
    fillPopular(rs.results,n);
}
async function findMovies(n)
{
        loading();
        const reqStr=`https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${strSearch}&page=${n}`;
        const response=await fetch(reqStr);
        const rs=await response.json();
        total_pages=parseInt(rs.total_pages,10);
        fillMovies(rs.results,n);
}
async function findMovies_Actors(n)
{
    loading();
    const reqStr=`https://api.themoviedb.org/3/search/person?api_key=${key}&query=${strSearch}&page=${n}`;
    const response=await fetch(reqStr);
    const rs=await response.json();
    total_pages=parseInt(rs.total_pages,10);
    fillMovies_Actors(rs.results,n);
}
function fillMovies_Actors(ps,page)
{
    if (total_pages==0)
    {
            $('#main').empty();
            $('#main').append(`
            <div class="col-md-12 pt-4">
                <div class="text-center">No results found</div>
                </div>
            `);
            return;
    }
    else
    {
        var i=0;
        $('#main').empty();
        for (const p of ps)
        {
            if (p.known_for_department=="Acting")
            {
                var j=0;
                for (m of p.known_for)
                {
                    var poster="https://image.tmdb.org/t/p/w500" + m.poster_path;
                    if (m.media_type=="movie")
                    {
                    i++;
                        if (m.poster_path==null)
                        {
                            if (p.gender=="1")
                            {
                            $('#main').append(`
                            <div class="col-md-4 pt-4">
                            <div class="card h-100" style="width: 100%;height:auto; border-style:solid;border-width:0.4rem" onclick="findMovies_Detail(${m.id})">
                            <div class="containers">
                            <img class="card-img-top" src="images/noposter.jpg" style="padding:0.5rem; height:35rem">
                            <div class="bottoms">
                                <div class="text-image">Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10</div>
                            </div>
                            </div>
                            <div class="card-body"
                            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
                            <p class="card-text text-center">Relative actress: ${p.name}</p>
                            </div>
                            </div>
                            </div>
                            `);
                            }
                            else
                            {
                                $('#main').append(`
                            <div class="col-md-4 pt-4">
                            <div class="card h-100" style="width: 100%;height:auto; border-style:solid;border-width:0.4rem" onclick="findMovies_Detail(${m.id})">
                            <div class="containers">
                            <img class="card-img-top" src="images/noposter.jpg" style="padding:0.5rem; height:35rem">
                            <div class="bottoms">
                                <div class="text-image">Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10</div>
                            </div>
                            </div>
                            <div class="card-body"
                            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
                            <p class="card-text text-center">Relative actor: ${p.name}</p>
                            </div>
                            </div>
                            </div>
                            `);
                            }
                        }
                        else
                        {
                            if (p.gender=="1")
                            {
                                $('#main').append(`
                                <div class="col-md-4 pt-4">
                                <div class="card h-100" style="width: 100%;height:auto" onclick="findMovies_Detail(${m.id})">
                                <div class="containers">
                                <img class="card-img-top" src=${poster} alt="No available poster" style="padding:0.5rem; height:35rem" >
                                <div class="bottoms">
                                    <div class="text-image"> Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10 </div>
                                </div>
                                </div>
                                <div class="card-body">
                                <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
                                <p class="card-text text-center">Relative actress: ${p.name}</p>
                                </div>
                                </div>
                                </div>
                                `);
                            }
                            else
                            {
                                $('#main').append(`
                                <div class="col-md-4 pt-4">
                                <div class="card h-100" style="width: 100%;height:auto" onclick="findMovies_Detail(${m.id})">
                                <div class="containers">
                                <img class="card-img-top" src=${poster} alt="No available poster" style="padding:0.5rem; height:35rem" >
                                <div class="bottoms">
                                    <div class="text-image"> Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10 </div>
                                </div>
                                </div>
                                <div class="card-body">
                                <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
                                <p class="card-text text-center">Relative actor: ${p.name}</p>
                                </div>
                                </div>
                                </div>
                                `);
                            }
                        }
                        if (i%3==0)
                        {
                            $('#main').append(`
                                <div class="w-100"> </div>
                            `);
                        }
                        j++;
                    }
                }
            }
        }
        if (i==0)
        {
            $('#main').append(`
            <div class="col-md-12 pt-4">
                <div class="text-center">No results found</div>
                </div>
            `);
        }
        pagination(page);
    }
}
function fillPopular(ms,page)
{
    $('#main').empty();
    var i=0;
    for (const m of ms)
    {
        i++;
        var poster="https://image.tmdb.org/t/p/w500" + m.poster_path;
        if (m.poster_path==null)
        {
            $('#main').append(`
            <div class="col-md-4 pt-4">
            <div class="card h-100" style="width: 100%;height:auto; border-style:solid;border-width:0.4rem" onclick="findMovies_Detail(${m.id})">
            <div class="containers">
            <img class="card-img-top" src="images/noposter.jpg" style="padding:0.5rem; max-height:33rem;min-height:20rem">
            <div class="bottoms">
                <div class="text-image">Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10</div>
            </div>
            </div>
            <div class="card-body">
            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
              <p class="card-text text-center" style="font-size:1.1rem">Popularity: ${m.popularity}</p>
            </div>
            </div>
            </div>
            `);
        }
        else
        {
            $('#main').append(`
            <div class="col-md-4 pt-4">
            <div class="card h-100" style="width: 100%;height:auto" onclick="findMovies_Detail(${m.id})">
            <div class="containers">
            <img class="card-img-top" src=${poster} alt="No available poster" style="padding:0.5rem; max-height:33rem;min-height:20rem" >
            <div class="bottoms">
                <div class="text-image"> Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10 </div>
             </div>
            </div>
            <div class="card-body">
            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
            <p class="card-text text-center" style="font-size:1.05rem">Popularity: ${m.popularity}</p>
            </div>
            </div>
            </div>
            `);
        }
        if (i%3==0)
        {
            $('#main').append(`
                <div class="w-100"> </div>
            `);
        }
    }
    pagination(page);
}
function fillMovies(ms,page)
{
    $('#main').empty();
    if (total_pages==0)
    {
        $('#main').append(`
        <div class="col-md-12 pt-4">
            <div class="text-center">No results found</div>
            </div>
        `);
        return;
    }
    var i=0;
    for (const m of ms)
    {
        i++;
        var poster="https://image.tmdb.org/t/p/w500" + m.poster_path;
        if (m.poster_path==null)
        {
            $('#main').append(`
            <div class="col-md-4 pt-4">
            <div class="card h-100" style="width: 26rem;height:auto; border-style:solid;border-width:0.4rem" onclick="findMovies_Detail(${m.id})">
            <div class="containers">
            <img class="card-img-top" src="images/noposter.jpg" style="padding:0.5rem; height:35rem">
            <div class="bottoms">
                <div class="text-image">Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10</div>
            </div>
            </div>
            <div class="card-body">
            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
              <p class="card-text">${m.overview}</p>
            </div>
            </div>
            </div>
            `);
        }
        else
        {
            $('#main').append(`
            <div class="col-md-4 pt-4" >
            <div class="card h-100" style="width: 26rem;height:auto" onclick="findMovies_Detail(${m.id})">
            <div class="containers">
            <img class="card-img-top" src=${poster} alt="No available poster" style="padding:0.5rem; height:35rem" >
            <div class="bottoms">
                <div class="text-image"> Release date: ${m.release_date}</br>Vote average: ${m.vote_average}/10 </div>
             </div>
            </div>
            <div class="card-body">
            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.title}</p>
            <p class="card-text"> ${m.overview}</p>
            </div>
            </div>
            </div>
            `);
        }
        if (i%3==0)
        {
            $('#main').append(`
                <div class="w-100"> </div>
            `);
        }
    }
    pagination(page);
}
function pagination(page)
{
    var begin =(page<3)? 1 : page-2;
    var end = (page<3)? 5 : page+2;
    if (chose==1)
    {
        if (page==1)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Previous</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies(${page-1})">Previous</a></li>
            `)
        }
        for (let i=begin;i<=end&&i<=total_pages;i++)
        {
            if (i==page)
            {
                $('#pagi').append(`
                <li class="page-item active" aria-current="page">
                <span class="page-link">
                  ${i}
                  <span class="sr-only">(current)</span>
                </span>
                `)
            }
            else
            {
                $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies(${i})" >${i}</a></li>
                `)
            }
        }
        if (page==total_pages)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Next</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies(${page+1})">Next</a></li>
            `)
        }
    }
    else if (chose==2)
    {
        if (page==1)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Previous</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies_Actors(${page-1})">Previous</a></li>
            `)
        }
        for (let i=begin;i<=end&&i<=total_pages;i++)
        {
            if (i==page)
            {
                $('#pagi').append(`
                <li class="page-item active" aria-current="page">
                <span class="page-link">
                  ${i}
                  <span class="sr-only">(current)</span>
                </span>
                `)
            }
            else
            {
                $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies_Actors(${i})" >${i}</a></li>
                `)
            }
        }
        if (page==total_pages)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Next</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findMovies_Actors(${page+1})">Next</a></li>
            `)
        }
    }
    else
    {
        if (page==1)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Previous</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findPopular(${page-1})">Previous</a></li>
            `)
        }
        for (let i=begin;i<=end&&i<=total_pages;i++)
        {
            if (i==page)
            {
                $('#pagi').append(`
                <li class="page-item active" aria-current="page">
                <span class="page-link">
                  ${i}
                  <span class="sr-only">(current)</span>
                </span>
                `)
            }
            else
            {
                $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findPopular(${i})" >${i}</a></li>
                `)
            }
        }
        if (page==total_pages)
        {
            $('#pagi').append(`
                <li class="page-item disabled">
                <span class="page-link">Next</span>
                </li>
            `)
        }
        else
        {
            $('#pagi').append(`
                <li class="page-item"><a class="page-link" href="#" onclick="findPopular(${page+1})">Next</a></li>
            `)
        }
    }
}

async function findMovies_Detail(id)
{
    $('.h3.text-center').empty();
    loading();
    const reqStr1=`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
    const response1=await fetch(reqStr1);
    const detail=await response1.json();
    const reqStr2=`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`;
    const response2=await fetch(reqStr2);
    const credit=await response2.json();
    fillMovies_Detail(detail,credit);
}
function fillMovies_Detail(d,c)
{
    $('#main').empty();
    var poster="https://image.tmdb.org/t/p/w300" + d.poster_path;
    if (d.poster_path==null )
    {
        $('#main').append(`
        <div class="col-md-4" style="padding-left:2rem">
        <div class="card " style="width: 23rem;height:30rem">
            <img src="images/noposter.jpg" style="width:auto;height:29rem">
            </div>
        </div>
        <div class="col-md-8" id="content">
            <div class="text-center" style="font-weight:bold;font-size:2rem"> ${d.title}</div>
                <div id="genres" style="margin-top:2rem">Genre(s): </div>
                <div id="directors">Director(s): </div>
                <div>Release date: ${d.release_date}</div>
                <div>Length: ${d.runtime} minutes </div>
                <div>Popularity: ${d.popularity}</div>
                <div>Budget: ${d.budget} USD</div>
                <div>Revenue: ${d.revenue} USD</div>
                <div>Vote average: ${d.vote_average}/10</div>
                </br>
                <div>Overview: ${d.overview}</div>
        </div> 
        <div class="container-fluid">
            <div class="text-center" style="font-size:2rem;padding-top:1rem">CAST</div>
            </div>
        <div class="row py-2" id="cast">
        </div></br>
        <div class="container-fluid" id='temp'>
        <div class="text-center" style="font-size:2rem;padding-top:1rem">REVIEW</div>
        
        </div>
        
    `);
    }
    else
    {
        $('#main').append(`
            <div class="col-md-4" style="padding-left:2rem">
            <div class="card " style="width: 23rem;height:auto">
                <img src=${poster} alt="No poster available" style="padding:0.5rem">
                </div>
            </div>
            <div class="col-md-8" id="content">
                <div class="text-center" style="font-weight:bold;font-size:2rem"> ${d.title}</div>
                    <div id="genres" style="margin-top:2rem">Genre(s): </div>
                    <div id="directors">Director(s): </div>
                    <div>Release date: ${d.release_date}</div>
                    <div>Popularity: ${d.popularity}</div>
                    <div>Length: ${d.runtime} minutes </div>
                    <div>Budget: ${d.budget} USD</div>
                    <div>Revenue: ${d.revenue} USD</div>
                    <div>Vote average: ${d.vote_average}/10</div>
                    </br>
                    <div>Overview: ${d.overview}</div>
            </div> 
            <div class="container-fluid">
            <div class="text-center" style="font-size:2rem;padding-top:1rem">CAST</div>
            </div>
            <div class="container-fluid" id="cast"></div>
            <div class="container-fluid" id='temp'>
            <div class="text-center" style="font-size:2rem;padding-top:1rem">REVIEW</div>
            </div>
            
            
        `);
    }
    var e=document.getElementById('genres');
    var i=0,a=0;
    for (const m of d.genres)
    {
        i++;
    }
    for (const m of d.genres)
    {
        a++;
        if (a==i)
        {
            e.innerHTML+=m.name;
        }
        else
        {
            e.innerHTML+=m.name+", ";
        }
    }
    i=true;
    e=document.getElementById('directors');
    for (const m of c.crew)
    {
        if (m.job=="Director")
        {
            if (i==true)
            {
                i=false;
                e.innerHTML+=m.name;
            }
            else
            {
                e.innerHTML+=", "+m.name;
            }
        }
    }

    i=0;
    var index,div;
    for (const m of c.cast)
    {
        i++;
        if (i==1)
        {
                $("#cast").append(`
            <div id="carouselExampleIndicators1" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators" id ="c1">
            
            </ol>
            <div class="carousel-inner" id="c2">
            
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true" ></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true" style:></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
            `);
        }
        var avatar="https://image.tmdb.org/t/p/w300"+m.profile_path;
        if (m.profile_path==null)
        {
            avatar="images/noimage.png"
        }
        mod=(i-1)%4;
        index=(i-1-mod)/4;
        if (mod==0)
        {
            if (i==1)
            {
                $('#c1').append(`
                <li data-target="#carouselExampleIndicators1" data-slide-to="${index}" class="active"></li>
                `);
                $('#c2').append(`
                <div class="carousel-item active" style="padding:0% 8.5% 5% 8.5%">
                <div class="row py-2" id="ca${index}">
                    <div class="col-sm-3 pt-4" >
                    <div class="card h-100" style="width: 95%;height:auto" onclick="findActor(${m.id})">
                    <div class="containers">
                    <img class="card-img-top" src=${avatar} alt="No available image" style="padding:0.5rem;
                    min-height:13rem; max-height:18rem;width:100%" >
                    <div class="bottoms">
                        <div class="text-image" id='gender${i}'> Gender:  </div>
                    </div>
                    </div>
                    <div class="card-body">
                    <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.name}</p>
                    <p class="card-text text-center" >as ${m.character} </p>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                `);
                
            }
            else
            {
                $('#c1').append(`
                <li data-target="#carouselExampleIndicators1" data-slide-to="${index}"></li>
                `);
                $('#c2').append(`
                <div class="carousel-item" style="padding:0% 8.5% 5% 8.5%">
                <div class="row py-2" id="ca${index}">
                <div class="col-sm-3 pt-4" >
                <div class="card h-100" style="width: 95%;height:auto" onclick="findActor(${m.id})">
                <div class="containers">
                <img class="card-img-top" src=${avatar} alt="No available image" style="padding:0.5rem;min-height:13rem; 
                max-height:18rem;width:100%" >
                <div class="bottoms">
                    <div class="text-image" id='gender${i}'> Gender:  </div>
                </div>
                </div>
                <div class="card-body">
                <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.name}</p>
                <p class="card-text text-center" >as ${m.character} </p>
                </div>
                </div>
                </div>
                </div>
            </div>
                `);
            }
        }
        else
        {
            var need="#ca"+index;
            $(need).append(`
            <div class="col-sm-3 pt-4" >
            <div class="card h-100" style="width: 95%;height:auto" onclick="findActor(${m.id})">
            <div class="containers">
            <img class="card-img-top" src=${avatar} alt="No available image" style="padding:0.5rem;min-height:13rem;
             max-height:18rem;width:100%" >
            <div class="bottoms">
                <div class="text-image" id='gender${i}'> Gender:  </div>
            </div>
            </div>
            <div class="card-body">
            <p class="card-text text-center text-uppercase" style="font-weight:bold;font-size:1.3rem">${m.name}</p>
            <p class="card-text text-center" >as ${m.character} </p>
            </div>
            </div>
            </div>
            `);
        }
        
        if (m.gender==2)
        {
            var e=document.getElementById('gender'+i).innerHTML+=" Male";
        }
        else if (m.gender==1)
        {
            var e=document.getElementById('gender'+i).innerHTML+=" Female";
        }
        else
        {
            var e=document.getElementById('gender'+i).innerHTML+=" --";
        }
    }
    
    fillReview(d.id);
}
async function fillReview(id)
{
    const reqStr=`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`;
    const response=await fetch(reqStr);
    const review=await response.json();
    var total=review.total_pages;
    if (total==0)
    {
        $("#temp").append(`
        <div class="text-center">No reviews</div>
        `);
    }
    else
    {
        $("#temp").append(`
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators" id="c3">
          
        </ol>
        <div class="carousel-inner" id="c4">
          
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
        `);
    }
    
    var count=0;
    for (var i=1;i<=total;i++)
    {
        const reqStr=`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&page=${i}`;
        const response=await fetch(reqStr);
        const review=await response.json();
        for (const m of review.results)
        {
            
            if (count==0)
            {
                $('#c3').append(`
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                `);
                $('#c4').append(`
                    <div class="carousel-item active">
                    <div style="padding-top:1rem;padding-left:75%;color:white">${m.author}</div>
                        <div class="text-center" style="padding-top:1rem;padding-bottom:4rem;
                        padding-left:8rem;padding-right:8rem">${m.content}</div> 
                        
                    </div>
                `);
            }
            else
            {
                $('#c3').append(`
                <li data-target="#carouselExampleIndicators" data-slide-to="${count}"></li>
                `);
                $('#c4').append(`
                    <div class="carousel-item">
                        <div style="padding-top:1rem;padding-left:75%;color:white">${m.author}</div>
                       <div class="text-center" style="padding-top:1rem;padding-bottom:4rem;
                       padding-left:8rem;padding-right:8rem"> ${m.content}</div> 
                       
                    </div>
                `);
            }


            count++;
        }
    }
}
async function findActor(id)
{
    loading();
    const reqStr=`https://api.themoviedb.org/3/person/${id}?api_key=${key}`;
    const response=await fetch(reqStr);
    const detail=await response.json();
    const reqStr1=`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${key}`;
    const response1=await fetch(reqStr1);
    const credit=await response1.json();
    fillActor(detail,credit);
}

function fillActor(d,c)
{
    $("#main").empty();
    var avatar="https://image.tmdb.org/t/p/w300_and_h450_bestv2"+d.profile_path;
    var birthday=d.birthday;
    if (d.birthday==null)
    {
        birthday="Unknown";
    }
    var placeofbirth=d.place_of_birth;
    if (d.place_of_birth==null)
    {
        placeofbirth="Unknown";
    }
    var biography=d.biography;
    if (d.biography=="")
    {
        biography="Unknown";
    }
    var gender;
    if (d.gender==2)
    {
        gender=" Male";
    }
    else if (d.gender==1)
    {
        gender=" Female";
    }
    else
    {
        gender=" Unknown";
    }
    if (d.profile_path==null)
    {
        avatar="images/noimage.png";
    }
    $("#main").append(`
    <div class="col-md-4" style="padding-left:2rem">
    <div class="card " style="width: 23rem;height:auto">
        <img src=${avatar} alt="No poster available" style="padding:0.5rem">
        </div>
    </div>
    <div class="col-md-8" id="content">
        <div class="text-center" style="font-weight:bold;font-size:2rem"> ${d.name}</div>
            <div>Birthday: ${birthday}</div>
            <div>Place of Birth: ${placeofbirth}</div> 
            <div>Gender:${gender} </div>
            <div>Popularity: ${d.popularity}</div>
            </br>
            <div>Biography: ${biography}</div></br>
    </div> 
    
    `);
    $('#out').append(`
        <div class="text-center" style="font-size:2.7vw">MOVIES</div></br>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators" id="c3">
          
        </ol>
        <div class="carousel-inner" id="c4">
          
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    `);
    var count=0;
    for (const m of c.cast)
    {
        var poster="https://image.tmdb.org/t/p/w300" + m.poster_path;
        if (m.poster_path==null)
        {
            poster="images/noposter.jpg";
        }
        if (count==0)
        {
            $('#c3').append(`
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            `);
            $('#c4').append(`
                <div class="carousel-item active" style="padding-bottom:4%">
                <div class="row py-2">
                <div class="col-md-2 pt-4 pb-6"></div>
                <div class="col-md-3 pt-4 pb-6" style="padding-left:2rem" onclick="findMovies_Detail(${m.id})">
                <div class="card h-100" style="width: 100%;max-height:25rem;">
                    <img src=${poster} alt="No poster available" style="width:100%;max-height:25rem;padding:0.5rem">
                    </div>
                </div>
                <div class="col-md-5 pt-4 pb-6" id="content" onclick="findMovies_Detail(${m.id})">
                    <div class="text-center" style="font-weight:900;font-size:2rem"> ${m.title}</div>
                        <div style="padding-top:7%">Release date: ${m.release_date}</div>
                        <div>Popularity: ${m.popularity}</div>
                        <div>Vote average: ${m.vote_average}/10</div>
                        <div>As character: ${m.character}</div>
                </div> 
                <div class="col-md-2 pt-4 pb-6"></div>
                </div>
                </div>
            `);
        }
        else
        {
            $('#c3').append(`
            <li data-target="#carouselExampleIndicators" data-slide-to="${count}"></li>
            `);
            $('#c4').append(`
                <div class="carousel-item" style="padding-bottom:4%">
                <div class="row py-2">
                <div class="col-md-2 pt-4 pb-6"></div>
                <div class="col-md-3 pt-4 pb-6" style="padding-left:2rem">
                <div class="card h-100" style="width: 100%;max-height:25rem;" onclick="findMovies_Detail(${m.id})">
                    <img src=${poster} alt="No poster available" style="width:100%;max-height:25rem;padding:0.5rem">
                    </div>
                </div>
                <div class="col-md-5 pt-4 pb-6" id="content" onclick="findMovies_Detail(${m.id})">
                    <div class="text-center" style="font-weight:900;font-size:2rem"> ${m.title}</div>
                        <div style="padding-top:7%">Release date: ${m.release_date}</div>
                        <div>Popularity: ${m.popularity}</div>
                        <div>Vote average: ${m.vote_average}/10</div>
                        <div>As character: ${m.character}</div>
                </div> 
                <div class="col-md-2 pt-4 pb-6"></div>
                </div>
                </div>
            `);
        }
        count++;
    }
}
