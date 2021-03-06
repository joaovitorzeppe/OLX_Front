import styled from "styled-components";

export const PageArea = styled.div`
    display: flex;
    margin-top: 20px;

    .leftSide{
        width: 250px;
        margin-right: 10px;

        .filterName{
            font-size: 15px;
            margin: 10px 0px;
        }

        input, select {
            width: 100%;
            height: 40px;
            border: 2px solid #9BB83C;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            padding: 10px;
            color: #000;
            background-color: #FFF;
        }

        ul, li{
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .categoryItem{
            display: flex;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            color: #000;
            cursor: pointer;

            img{
                height: 25px;
                width: 25px;
                margin-right: 5px;
            }
            span {
                font-size: 14px;
            }
        }

        .categoryItem:hover,
        .categoryItem.active {
            background-color: #9BB83C;
            color: #FFF;
        }
    }

    .rightSide{
        flex: 1;

        h2 {
            margin-top: 0;
            font-size: 18px;
        }

        .listWarning {
            padding: 30px;
            text-align: center;
        }

        .list {
            display: flex;
            flex-wrap: wrap;

            .aditem{
                width: 33%;
            }
        }
    
        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 10px 0;

            .pagItem {
                height: 30px;
                width: 30px;
                border: 1px solid #CCC;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                margin-right: 0px;
                cursor: pointer;

                &:hover{
                    border: 1px solid #999;
                }
                &.active{
                    background-color: #CCC;
                }
            }
        }
    }

    @media (max-width:600px){
        flex-direction: column;

        .leftSide{
            width: auto;
            margin: 10px;
            
            ul {
                flex-wrap: wrap;
                display: flex;
            }

            .categoryItem{
                display: flex;
                width: 50%;
                margin-bottom: 10px;
            
                img{
                    width: 45px;
                    height: 45px;
                    margin-right: 10px;
                }
            }
        }

        .rightSide{
            margin: 10px;
            
            .list .aditem{
                width: 50%;
            }
        }
    }

`;