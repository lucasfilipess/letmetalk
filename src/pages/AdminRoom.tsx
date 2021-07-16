import { useHistory, useParams } from 'react-router-dom';
import { database } from '../services/firebase';
import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import deleteImg from '../assets/images/delete.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import '../styles/room.scss';

type RoomParams = {
  roomId: string;
};

export function AdminRoom() {
  // const { user } = useAuth();
  const { push } = useHistory();
  const { roomId } = useParams<RoomParams>();
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?'))
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(
            ({ content, author, isAnswered, isHighlighted, id }) => (
              <Question
                key={id}
                content={content}
                author={author}
                isAnswered={isAnswered}
                isHighlighted={isHighlighted}
              >
                {!isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(id)}
                    >
                      <img
                        src={checkImg}
                        alt="Marcar pergunta como respondida"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button type="button" onClick={() => handleDeleteQuestion(id)}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          )}
        </div>
      </main>
    </div>
  );
}
