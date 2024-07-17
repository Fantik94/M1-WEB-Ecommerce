import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ currentStep, descriptions }) => {
  const steps = [
    { id: 1, title: 'Panier', icon: 'cart' },
    { id: 2, title: 'Livraison', icon: 'truck' },
    { id: 3, title: 'Paiement', icon: 'payment' },
    { id: 4, title: 'Commande effectuée', icon: 'check' }
  ];

  const getIcon = (icon, isCompleted) => {
    if (isCompleted) {
      return (
        <svg className="w-5 h-5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
        </svg>
      );
    }
    
    switch (icon) {
      case 'cart':
        return (
          <svg className="w-5 h-5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 2a1 1 0 1 1 0 2H4v2h12V4h-2a1 1 0 1 1 0-2h3a1 1 0 0 1 1 1v3h1a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1h1Zm3 7.5V7a1 1 0 1 1 2 0v2.5l1.3 1.3a1 1 0 0 1-1.4 1.4l-1.3-1.3V14a1 1 0 1 1-2 0v-2.5l-1.3-1.3a1 1 0 1 1 1.4-1.4L9 9.5Z"/>
        </svg>
        );
      case 'truck':
        return (
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0-2Z"/>
          </svg>
        );
      case 'payment':
        return (
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
          </svg>
        );
      case 'check':
        return (
          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <ol className="flex space-x-8 text-gray-500 mb-5 dark:border-gray-700 dark:text-gray-400">
        {steps.map((step) => (
          <li key={step.id} className={`flex items-center space-x-2 ${currentStep === step.id ? 'font-bold text-gray-900 dark:text-white' : ''}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white dark:ring-gray-900 ${currentStep === step.id ? 'bg-green-200 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
              {getIcon(step.icon, step.id < currentStep)}
            </span>
            <div>
              <h3 className="font-medium leading-tight">{step.title}</h3>
              <p className="text-sm">{descriptions[step.id]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

ProgressBar.propTypes = {
  currentStep: PropTypes.number.isRequired,
  descriptions: PropTypes.object.isRequired
};

export default ProgressBar;
