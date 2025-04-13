import React, { useEffect, useState } from 'react';
import { getGroups, joinGroup, leaveGroup } from '../services/api';
import '../styles/global.css'; // Import your CSS file

const GroupList = ({ currentUser }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch groups on mount
    useEffect(() => {
        async function fetchGroups() {
            try {
                const data = await getGroups();
                setGroups(data);
            } catch (err) {
                setError('Error fetching groups');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchGroups();
    }, []);

    // Join a group handler
    const handleJoin = async (groupId) => {
        try {
            await joinGroup(currentUser.userId, groupId);
            setGroups(prevGroups =>
                prevGroups.map(group =>
                    group.groupId === groupId ? { ...group, isMember: true } : group
                )
            );
        } catch (err) {
            console.error('Error joining group:', err);
        }
    };

    // Leave a group handler
    const handleLeave = async (groupId) => {
        try {
            await leaveGroup(currentUser.userId, groupId);
            setGroups(prevGroups =>
                prevGroups.map(group =>
                    group.groupId === groupId ? { ...group, isMember: false } : group
                )
            );
        } catch (err) {
            console.error('Error leaving group:', err);
        }
    };

    // Separate groups into categories
    const myGroups = groups.filter(group => group.isMember);
    const availableGroups = groups.filter(group => !group.isMember);

    if (loading) return <div className="loadingMessage">Loading groups...</div>;
    if (error) return <div className="errorMessage">{error}</div>;

    return (
        <div className="groupListContainer">
            <section>
                <h2>My Groups</h2>
                {myGroups.length === 0 ? (
                    <p>You are not a member of any groups.</p>
                ) : (
                    myGroups.map(group => (
                        <div key={group.groupId} className="groupCard">
                            <h3>{group.name}</h3>
                            <button className="btn" onClick={() => handleLeave(group.groupId)}>
                                Leave Group
                            </button>
                        </div>
                    ))
                )}
            </section>

            <section>
                <h2>Available Groups</h2>
                {availableGroups.length === 0 ? (
                    <p>No groups available to join.</p>
                ) : (
                    availableGroups.map(group => (
                        <div key={group.groupId} className="groupCard">
                            <h3>{group.name}</h3>
                            <button className="btn" onClick={() => handleJoin(group.groupId)}>
                                Join Group
                            </button>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default GroupList;
