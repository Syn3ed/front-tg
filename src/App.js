import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./style.css";




export const App = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const { id } = useParams();;
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 66;
        const response = await axios.get(`https://www.tgbottp.ru/mes/${id}`);
        const dataArray = response.data.map(item => ({
          userRequestId: item.userRequestId,
          status: item.status,
          description: item.description,
          subject: item.subject,
          username: item.username,
          address: item.address,
          userId: item.userId
        }));
        console.log('Full Data Array:', dataArray[0].status);
        setDataArray(dataArray);
      } catch (error) {
        console.error('Ошибка при получении данных о заявке:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get(`https://www.tgbottp.ru/chat/66`);
        setChatMessages(response.data);
      } catch (error) {
        console.error('Ошибка при получении сообщений чата', error);
      }
    };

    fetchChatMessages();
  }, []);


  return (
    <div className="iphone-mini">
      <div className="overlap-group-wrapper">
        <div className="overlap-group">
          <div className="overlap-group1">
            <h1>Заявка</h1>
            <div className="rectangle">
              <br />
              <b>Никнейм пользователя</b>
              <article>{dataArray.length > 0 ? dataArray[0].username : "Нет данных"}</article>
              <br />
            </div>
            <div className="rectangle-5">
              <br />
              <b>Статус заявки</b>
              <article>{dataArray.length > 0 ? dataArray[0].status : "Нет данных"}</article>
              <br />
            </div>
            <div className="rectangle-2">
              <br />
              <b>Категория заявки</b>
              <article>{dataArray.length > 0 ? dataArray[0].subject : "Нет данных"}</article>
              <br />
            </div>
            <div className="rectangle-3">
              <br />
              <b>Адрес ПЗУ</b>
              <article>{dataArray.length > 0 ? dataArray[0].address : "Нет данных"}</article>
              <br />
            </div>
            <div className="rectangle-4">
              <br />
              <b>Описание</b>
              <article>Ясность нашей позиции очевидна: высокое качество позиционных исследований предопределяет высокую востребованность глубокомысленных рассуждений.</article>
              <br />
            </div>
          </div>
          <div className="rectangle-6">
            <b>Диалог</b>
              <div className="chat-container">
                {chatMessages.map((message, index) => (
                  <div key={index} className={message.roleUser === 'User' ? 'User' : 'Operator'}>
                    <div className="message-header">{message.username}</div>
                    {message.textMessage}
                    {message.IdMedia && (
                      <button >
                        Показать файл
                      </button>
                    )}
                    <div className="message-Time">{message.Time}</div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div >
  );
};

export default App;
