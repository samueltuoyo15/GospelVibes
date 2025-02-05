import { useState } from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import Footer from '../Components/Footer';
import { CreditCard } from 'lucide-react';

function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { email: '', username: '' };

   const getConfig = (amount: number, plan: string) => ({
    public_key: import.meta.env.VITE_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}`,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,ussd,banktransfer',
    customer: {
      email: user.email,
      phone_number: '',
      name: user.username,
    },
    customizations: {
      title: 'Premium Subscription',
      description: `Payment for Gospel Music ${plan} Premium Access`,
      logo: '/album.jpeg',
    },
  });

  const handlePayment = (amount: number, plan: string) => {
    const config = getConfig(amount, plan);
    return {
      ...config,
      text: 'Pay Now',
      callback: (response: any) => {
        console.log(response);
        if (response.status === 'successful') {
          alert('Payment successful!');
          // Verify the transaction in your backend here
        } else {
          alert('Payment failed!');
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log('Payment closed');
      },
    };
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen text-white">
      <div className="md:ml-64 container mx-auto px-4 py-16 mb-32">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Premium Plan</h2>
        <div className="grid md:grid-cols-2 gap-5 w-full mx-auto">
          {/* Monthly Plan Card */}
          <div
            onClick={() => setSelectedPlan('monthly')}
            className={`bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden transform transition duration-300 ${
              selectedPlan === 'monthly' ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-105'
            }`}
          >
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Monthly Plan</h3>
              <p className="text-gray-600 mb-4">Enjoy premium features every month</p>
              <div className="text-4xl font-bold text-purple-600 mb-6">
                ₦500<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <ul className="text-sm text-gray-600 mb-8">
                <li className="mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> Full access to all songs
                </li>
                <li className="mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> Ad-free listening
                </li>
                <li className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> High-quality audio
                </li>
              </ul>
              {selectedPlan === 'monthly' && (
                <FlutterWaveButton
                  {...handlePayment(500, 'Monthly')}
                  className="w-full bg-purple-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-purple-700 transition duration-300"
                />
              )}
            </div>
          </div>

          {/* Yearly Plan Card */}
          <div
            onClick={() => setSelectedPlan('yearly')}
            className={`w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 ${
              selectedPlan === 'yearly' ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-105'
            }`}
          >
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Yearly Plan</h3>
              <p className="text-gray-600 mb-4">Save more with our annual subscription</p>
              <div className="text-4xl font-bold text-blue-600 mb-6">
                ₦1000<span className="text-lg font-normal text-gray-600">/year</span>
              </div>
              <ul className="text-sm text-gray-600 mb-8">
                <li className="mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> All monthly plan features
                </li>
                <li className="mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> Exclusive yearly subscriber content
                </li>
                <li className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-green-500" /> Priority customer support
                </li>
              </ul>
              {selectedPlan === 'yearly' && (
                <FlutterWaveButton
                  {...handlePayment(1000, 'Yearly')}
                  className="w-full bg-blue-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-blue-700 transition duration-300"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Premium;
