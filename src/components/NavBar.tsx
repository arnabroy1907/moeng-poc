import { useEffect } from 'react';
import st from 'styled-components';

const NavBarWrapper = st.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-bottom: 2px solid #222;
    background-color: #fff;
    padding: 0;

    z-index: 222;
`;

const NavBarContent = st.div`
    padding: 0.5rem 1.5rem;
`;

const NavBarLogo = st.div`
    h1 {
        font-size: 20px;
        font-weight: 700;
    }
`;

const NavBarOptions = st.div``;

const NavBarLogout = st.div`
    padding: 0 1rem;
    span {
        font-size: 16px;
        font-weight: 700;
        color: #5f62f7;
        cursor: pointer;
    }
`;

type NavBarProps = {
    isLoggedIn: boolean;
    logoutUser: () => void;
}

export const NavBar = (props: NavBarProps) => {

    useEffect(() => {
        // @ts-ignore
        if (window.Moengage) {
            // @ts-ignore
            const Moengage = window.Moengage;

            Moengage.cards.setInboxOpenListener(() => {
                console.log('Inbox is opened.');
            });

            Moengage.cards.setInboxCloseListener(() => {
                console.log('Inbox is closed.')
            });

            Moengage.cards.setCardClickListener((cardId: any) => {
                console.log('Card clicked: ', cardId)
            });
        }
    }, [])

    return (
        <NavBarWrapper>
            <NavBarContent>
                <NavBarLogo>
                    <h1> Moengage POC App </h1>
                </NavBarLogo>
                <NavBarOptions></NavBarOptions>
            </NavBarContent>
            <NavBarLogout
                id='cardIcon'
                hidden={!props.isLoggedIn}
                onClick={() => {
                    // @ts-ignore
                    if (window.Moengage) {
                        // @ts-ignore
                        const Moengage = window.Moengage;

                        console.log('in inbox click if statement');
                        Moengage.cards.getNewCardCount().then((newCardCount: any) => {
                            console.log(newCardCount); // newCardCount is in Number format
                        });
                        // Moengage.cards.inboxOpened();
                        Moengage.cards.getNewCardCount().then((newCardCount: any) => {
                            console.log(newCardCount); // newCardCount is in Number format
                        });
                        Moengage.cards.getCardCategories().then((cat: any) => {
                            console.log('getCardCategories ', cat);
                        });
                        Moengage.cards.isAllCategoryEnabled().then(function(enabled: any) {
                            console.log('isAllCategoryEnabled ', enabled); // boolean
                        })
                    }
                }}
            >
                <span>Inbox</span>
            </NavBarLogout>
            {props.isLoggedIn && <NavBarLogout>
                <span onClick={() => { props.logoutUser(); }}> Logout </span>
            </NavBarLogout>}
        </NavBarWrapper>
    )
}
