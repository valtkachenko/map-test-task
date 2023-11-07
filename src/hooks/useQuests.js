import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const useQuests = () => {
  const add = async (nextQuest, questMarker) =>
    await addDoc(collection(db, 'quests'), {
      [`quest_${nextQuest}`]: questMarker,
    });
  const update = async (nextQuest, questMarker, document) =>
    await updateDoc(
      doc(db, 'quests', document),
      {
        [`quest_${nextQuest}`]: questMarker,
      },
      { merge: true }
    );

  return { add, update };
};

export { useQuests };
