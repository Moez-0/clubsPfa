import React, { useState, useEffect } from 'react';
import { FaChartPie, FaCcDinersClub, FaSun, FaUserCircle, FaCalendar , FaAd , FaAccessibleIcon , FaAddressCard} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';


const filterClubs = (userId, clubs) => {
    return clubs.filter((club) => club.clubAdmin === userId);
}


const getUserData = async (id) => {
    try {
        const response = await axios.get(`/api/user/${id}`);
        
        return response.data.user;
    } catch (error) {
        return null;
    }
}

const ClubDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    axios.defaults.withCredentials = true;
    const [userId , setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [allClubs, setAllClubs] = useState([]);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/auth/verify');

                if (response.data.success) {
                    setIsAuthenticated(true);
                    
                }else{
                    navigate("/404", { replace: true } , { state: { message: "You need to be logged in to access this page" } } , { message: "You need to be logged in to access this page" });

                }
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);
   

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    
    //get user id 
    useEffect(() => {
        const fetchUserId = async () => {
          try {
            const response = await axios.get('/api/user/id');
            console.log(response.data.id)
            setUserId(response.data.id);
          } catch (error) {


          }
        };
    
        fetchUserId();
      }, []);
    
    //get user data

       useEffect(() => {
        if (userId) {
            getUserData(userId).then((user) => {
                setUser(user);
                setUserData(user);
                setNotifications(user.notifications);
  
            });
        }
    }
    , [userId]);


      //get all clubs 
      useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.get('/api/club/clubs');
  
                if (response.data.success) {
                    const clubs = filterClubs(userId, response.data.clubs);
                    setAllClubs(clubs);
        
                   
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchClubs();
    }, [navigate,allClubs]);

    
    
    return (

        <div className="h-full w-full mt-20">
            <div className='studentDash h-full w-full flex flex-col md:flex-row'>

                <div className='leftMenu md:h-full bg-darky px-5 h-[20%]  md:w-[20%] md:h-screen flex flex-col justify-evenly items-center flex-1 '>
                    <Link to="/club-dashboard/" className='mt-5 text-4xl font-bold text-ocean-blue-100'>Clubsy</Link>
                    <div className='Menulinks h-full flex flex-col justify-center'>


                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5 ">
                    <Link to="/club-dashboard/details" className="text-ocean-blue-100 flex items-center space-x-2 ">
                        <FaUserCircle className="text-xl" />
                        <span >Club Details</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaCcDinersClub className="text-xl" />
                        <span>Administrative autorization application</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/members/" className="text-white flex items-center space-x-2 ">
                        <FaChartPie className="text-xl" />
                        <span>Club Members</span>
                    </Link>
                    </div>  
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaCalendar className="text-xl" />
                        <span>Club Events</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAd className="text-xl" />
                        <span>Club News</span>
                    </Link>
                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAddressCard className="text-xl" />
                        <span>Club Statistics</span>
                    </Link>

                    </div>
                    <div className="clubDetailsSection flex flex-col items-center justify-center my-5">
                    <Link to="/club-dashboard/details" className="text-white flex items-center space-x-2 ">
                        <FaAccessibleIcon className="text-xl" />
                        <span>Recrute memebers</span>
                    </Link>

                    </div>

                    


                    </div>




           
                    </div>
                <div className='rightSection h-[80%] md:h-full md:w-[80%] '>
                    <div className='px-10 flex justify-between items-center h-20 bg-teeth
                    shadow-md'>
                        <div className='flex items-center space-x-2'>
                            <button className='text-3xl text-ocean-blue-100' onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='flex items-center space-x-2 mr-5'>
                            { user.userName}
                            <Link to="/profile" className='text-3xl text-ocean-blue-100'></Link>
                            <FaUserCircle className='text-3xl text-ocean-blue-100' />
                        </div>

                        

                    </div>
                    <div className='mainContent h-[80%] md:h-full '>
                        { allClubs.length > 0 ? (
                            <div className='flex flex-col items-center justify-center h-full'>

                                <h2 className='text-3xl'>You have {allClubs.length} clubs</h2>
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center h-full'>
       
                                <h2 className='text-3xl'>You have no clubs</h2>
                            </div>
                        )
                        }

                        { allClubs.length > 0 && (
                            <div className='flex flex-col items-center justify-center h-full'>
                              
                                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4 p-4'>
                    {allClubs.map((club) => (
                        <div key={club._id} className='bg-white rounded-md p-4 flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold'>{club.clubName}</h1>

                            <img className='w-32 h-32 m-2' src={club.clubImage} alt={club.clubName} />
                            <button className='w-32 h-10 m-2 p-2 bg-indigo-950 text-white rounded-md'>Edit</button>
                            <button className='w-32 h-10 m-2 p-2 bg-red-950 text-white rounded-md'>Delete</button>
                            <Link to={`/club-dashboard/post-news/${club._id}`} className='w-32 h-10 m-2 p-2 bg-green-950 text-white rounded-md'>Post News</Link>
                           
                        </div>
                    ))}
                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ClubDashboard;