import React, { useState, useEffect } from 'react';

const defaultQuestions = [
  "What emerging genetic technology excites you the most? How might it change our field?",
  "What's the most challenging ethical dilemma you've faced in your practice? How did you resolve it?",
  "How do you approach counseling for conditions with variable expressivity or reduced penetrance?",
  "Discuss a time when you had to deliver unexpected results. How did you manage the situation?",
  "What's your approach to counseling minors about adult-onset conditions?",
  "How do you address potential family conflicts that arise from genetic information?",
  "What's your strategy for staying emotionally resilient in this field?",
  "How do you handle situations where patients seek information about non-paternity?",
  "How do you approach the topic of pregnancy termination in prenatal counseling?",
  "What's your method for explaining probability and risk to patients?",
  "How do you handle situations where you disagree with a colleague's approach or interpretation?",
  "What has been your biggest challenge in transitioning from classroom learning to clinical practice?",
  "How are you building your professional network and finding mentorship opportunities?",
  "What area of genetic counseling do you feel you need more experience or education in? How are you addressing this?",
  "What self-care strategies are you developing to prevent burnout early in your career?",
  "How do you approach difficult conversations with more experienced colleagues or supervisors?",
  "How are you integrating the latest research and guidelines into your practice as a new professional?",
  "How do you handle feelings of imposter syndrome? What affirmations or evidence do you use to combat these feelings?",
  "What aspects of genetic counseling do you find most challenging, and how are you working to improve in these areas?",
  "How do you approach continuing education and professional development as a new genetic counselor?",
  "🚨 Have you ever been in a situation where you felt a colleague was practicing unethically? How did you handle it?",
  "🚨 Describe a time when you had to deliver devastating news to a patient. How did you manage your own emotions?",
  "🚨 Have you ever disagreed with a patient's decision regarding their genetic health? How did you approach this?",
  "🚨 Discuss a time when you felt overwhelmed by the emotional demands of the job. How did you cope?",
  "🚨 Have you ever made a mistake in your practice that had significant consequences? How did you address it?",
  "🚨 How do you navigate situations where your personal beliefs conflict with a patient's choices?",
  "🚨 Describe a time when you felt pressured to breach patient confidentiality. How did you handle it?",
  "🚨 Have you ever had to report a colleague for unethical behavior? What was that experience like?",
  "🚨 How do you manage the emotional impact of working with terminally ill patients or their families?",
  "🚨 Discuss a situation where you felt out of your depth professionally. How did you address it?",
];

const Wheel = () => {
  const [state, setState] = useState({
    spinning: false,
    result: null,
    rotation: 0,
    questions: defaultQuestions,
    askedQuestions: [],
    newQuestion: '',
    showQuestions: false,
    showAskedQuestions: false,
    timer: 300,
    timerDuration: 300,
    isTimerRunning: false,
  });

  useEffect(() => {
    let interval;
    if (state.isTimerRunning && state.timer > 0) {
      interval = setInterval(() => setState(s => ({ ...s, timer: s.timer - 1 })), 1000);
    } else if (state.timer === 0) {
      setState(s => ({ ...s, isTimerRunning: false }));
    }
    return () => clearInterval(interval);
  }, [state.isTimerRunning, state.timer]);

  const updateState = (newState) => setState(s => ({ ...s, ...newState }));

  const spinWheel = () => {
    if (!state.spinning && state.questions.length > 0) {
      updateState({ spinning: true });
      const newRotation = state.rotation + 1440 + Math.floor(Math.random() * 360);
      updateState({ rotation: newRotation });
      setTimeout(() => {
        const availableQuestions = state.questions.filter(q => !state.askedQuestions.includes(q));
        if (availableQuestions.length === 0) {
          updateState({ 
            spinning: false, 
            result: "All questions have been asked. Reset the wheel to start over." 
          });
        } else {
          const newQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
          updateState({ 
            spinning: false, 
            result: newQuestion, 
            askedQuestions: [...state.askedQuestions, newQuestion],
            timer: state.timerDuration,
            isTimerRunning: false 
          });
        }
      }, 5000);
    }
  };

  const addQuestion = () => {
    if (state.newQuestion.trim() !== '') {
      updateState({ 
        questions: [...state.questions, state.newQuestion.trim()], 
        newQuestion: '' 
      });
    }
  };

  const removeQuestion = (index) => {
    const updatedQuestions = state.questions.filter((_, i) => i !== index);
    updateState({ questions: updatedQuestions });
  };

  const resetWheel = () => updateState({ askedQuestions: [], result: null });

  const wheelColors = [
    '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', 
    '#B5EAD7', '#C7CEEA', '#9ED2FF', '#E0BBE4'
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <div className="mb-8 text-center max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">GC Peer Supervision Discussion Starter</h1>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <h2 className="text-2xl font-bold mb-2">How to Use This Tool:</h2>
          <ul className="list-disc pl-5 text-left">
            <li>Spin the wheel to select a random discussion topic or icebreaker.</li>
            <li>Use the timer to keep your discussions on track.</li>
            <li>Add custom questions or remove existing ones to tailor your question pool.</li>
            <li>Questions marked with 🚨 are more challenging. It's okay to skip these if the group isn't comfortable.</li>
            <li>Track which questions have been asked to avoid repetition.</li>
            <li>Reset the wheel when you've gone through all questions or want to start fresh.</li>
          </ul>
        </div>
        <p className="text-lg">Ready to start? Spin the wheel for a question to stimulate discussion or break the ice!</p>
      </div>
      <div className="relative w-80 h-80 mb-8">
        <div 
          className="w-full h-full rounded-full shadow-lg overflow-hidden"
          style={{
            transform: `rotate(${state.rotation}deg)`,
            transition: state.spinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
          }}
        >
          {wheelColors.map((color, index) => (
            <div 
              key={index}
              className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left"
              style={{
                backgroundColor: color,
                transform: `rotate(${index * 45}deg) skew(45deg)`
              }}
            ></div>
          ))}
        </div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer"
          onClick={spinWheel}
        >
          <span className="text-4xl">🧬</span>
        </div>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-xl font-bold mb-8 transition duration-300"
        onClick={spinWheel}
        disabled={state.spinning || state.questions.length === 0}
      >
        {state.spinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>
      <button 
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full text-xl font-bold mb-8 transition duration-300"
        onClick={resetWheel}
      >
        Reset Wheel
      </button>
      {state.result && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Discussion Topic:</h2>
          <p className="text-2xl">{state.result}</p>
        </div>
      )}
      <div className="w-full max-w-2xl mb-8">
        <input 
          type="text" 
          value={state.newQuestion} 
          onChange={(e) => updateState({ newQuestion: e.target.value })}
          placeholder="Enter a custom question"
          className="w-full p-2 mb-2 border rounded"
        />
        <button 
          onClick={addQuestion}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 mr-2"
        >
          Add Custom Question
        </button>
        <button 
          onClick={() => updateState({ showQuestions: !state.showQuestions })}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 mr-2"
        >
          {state.showQuestions ? 'Hide Questions' : 'Show All Questions'}
        </button>
        <button 
          onClick={() => updateState({ showAskedQuestions: !state.showAskedQuestions })}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition duration-300"
        >
          {state.showAskedQuestions ? 'Hide Asked Questions' : 'Show Asked Questions'}
        </button>
      </div>
      {state.showQuestions && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">All Questions:</h2>
          <ul className="list-disc pl-5">
            {state.questions.map((question, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span>{question}</span>
                <button 
                  onClick={() => removeQuestion(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {state.showAskedQuestions && (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Asked Questions:</h2>
          <ul className="list-disc pl-5">
            {state.askedQuestions.map((question, index) => (
              <li key={index} className="mb-2">
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Discussion Timer</h2>
        <div className="flex items-center justify-between mb-4">
          <input 
            type="number" 
            value={state.timerDuration / 60}
            onChange={(e) => updateState({ timerDuration: e.target.value * 60, timer: e.target.value * 60 })}
            min="1"
            className="w-20 p-2 border rounded mr-2"
          />
          <span className="mr-4">minutes</span>
          <button 
            onClick={() => updateState({ isTimerRunning: true })}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
            disabled={state.isTimerRunning}
          >
            Start
          </button>
          <button 
            onClick={() => updateState({ isTimerRunning: false })}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-300 ml-2"
            disabled={!state.isTimerRunning}
          >
            Pause
          </button>
          <button 
            onClick={() => updateState({ timer: state.timerDuration, isTimerRunning: false })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ml-2"
          >
            Reset
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(state.timer / state.timerDuration) * 100}%` }}
          ></div>
        </div>
        <p className="text-center mt-2">
          {Math.floor(state.timer / 60)}:{(state.timer % 60).toString().padStart(2, '0')}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 text-sm text-gray-500">
        Created by Sommon Klumsathian MGenCouns MHGSA with the help of Claude 3.5 Sonnet
      </div>
    </div>
  );
};

export default Wheel;