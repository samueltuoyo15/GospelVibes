import { useState } from 'react'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3'
import Footer from '../Components/Footer'
import { CreditCard } from 'lucide-react'

function Premium() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null)

  const getConfig = (amount: number, plan: string) => ({
    public_key: import.meta.PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}`,
    amount: amount,
    currency: 'NGN',
    payment_options: 'card,ussd,banktransfer',
    customer: {
      email: localstorage.getItem('user'),
      phone_number: '08012345678',
      name: localstorage.getItem('user'),
    },
    customizations: {
      title: 'Premium Subscription',
      description: `Payment for Gospel Music ${plan} Premium Access`,
      logo: '/album.jpeg',
    },
  });

  const handlePayment = (amount: number, plan: string) => {
    const config = getConfig(amount, plan);
    const fwConfig = {
      ...config,
      text: 'Pay Now',
      callback: (response: any) => {
        console.log(response);
        if (response.status === 'successful') {
          alert('Payment successful!');
        } else {
          alert('Payment failed!');
        }
        closePaymentModal();
      },
      onClose: () => {
        console.log('Payment closed');
      },
    };
    return fwConfig;
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Choose Your Premium Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan Card */}
          <div className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 ${selectedPlan === 'monthly' ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-105'}`}>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Monthly Plan</h3>
              <p className="text-gray-600 mb-4">Enjoy premium features every month</p>
              <div className="text-4xl font-bold text-purple-600 mb-6">₦500<span className="text-lg font-normal text-gray-600">/month</span></div>
              <ul className="text-sm text-gray-600 mb-8">
                <li className="mb-2 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> Full access to all songs</li>
                <li className="mb-2 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> Ad-free listening</li>
                <li className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> High-quality audio</li>
              </ul>
              <FlutterWaveButton
                {...handlePayment(500, 'Monthly')}
                className="w-full bg-purple-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-purple-700 transition duration-300"
                onClick={() => setSelectedPlan('monthly')}
              />
            </div>
          </div>

          {/* Yearly Plan Card */}
          <div className={`bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 ${selectedPlan === 'yearly' ? 'scale-105 ring-4 ring-yellow-400' : 'hover:scale-105'}`}>
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Yearly Plan</h3>
              <p className="text-gray-600 mb-4">Save more with our annual subscription</p>
              <div className="text-4xl font-bold text-blue-600 mb-6">₦1000<span className="text-lg font-normal text-gray-600">/year</span></div>
              <ul className="text-sm text-gray-600 mb-8">
                <li className="mb-2 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> All monthly plan features</li>
                <li className="mb-2 flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> Exclusive yearly subscriber content</li>
                <li className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-green-500" /> Priority customer support</li>
              </ul>
              <FlutterWaveButton
                {...handlePayment(1000, 'Yearly')}
                className="w-full bg-blue-600 text-white rounded-full py-3 px-6 font-semibold hover:bg-blue-700 transition duration-300"
                onClick={() => setSelectedPlan('yearly')}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Premium

