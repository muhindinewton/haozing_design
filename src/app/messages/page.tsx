'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { MESSAGES } from '@/lib/data';
import { Send, Search, Phone, MoreVertical, ArrowLeft, MessageCircle } from 'lucide-react';

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState('');

  const conversation = activeConv ? MESSAGES.find(m => m.id === activeConv) : null;

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="page-header mb-6">Messages</h1>

        <div className="card overflow-hidden flex h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className={`w-full md:w-80 border-r border-stone-100 flex flex-col ${activeConv ? 'hidden md:flex' : 'flex'}`}>
            {/* Search */}
            <div className="p-4 border-b border-stone-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input type="text" placeholder="Search messages..." className="input-field pl-9 py-2 text-sm" />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto">
              {MESSAGES.map(m => (
                <button key={m.id} onClick={() => setActiveConv(m.id)} className={`w-full flex items-start gap-3 p-4 hover:bg-stone-50 text-left transition-all border-b border-stone-50 ${activeConv === m.id ? 'bg-brand-50 hover:bg-brand-50' : ''}`}>
                  <div className="relative shrink-0">
                    <img src={m.contactAvatar} className="w-12 h-12 rounded-full object-cover" alt={m.contactName} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100'; }} />
                    {m.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-brand-700 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <p className={`text-sm font-semibold truncate ${activeConv === m.id ? 'text-brand-700' : 'text-stone-900'}`}>{m.contactName}</p>
                      <span className="text-xs text-stone-400 shrink-0">{m.timestamp}</span>
                    </div>
                    <p className="text-xs text-stone-500 truncate mb-0.5">{m.propertyTitle}</p>
                    <p className={`text-xs truncate ${m.unread ? 'text-stone-900 font-medium' : 'text-stone-400'}`}>{m.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat panel */}
          {conversation ? (
            <div className={`flex-1 flex flex-col ${activeConv ? 'flex' : 'hidden md:flex'}`}>
              {/* Header */}
              <div className="p-4 border-b border-stone-100 flex items-center gap-3">
                <button onClick={() => setActiveConv(null)} className="md:hidden"><ArrowLeft className="w-5 h-5" /></button>
                <img src={conversation.contactAvatar} className="w-10 h-10 rounded-full object-cover" alt={conversation.contactName} onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100'; }} />
                <div className="flex-1">
                  <p className="font-semibold text-stone-900">{conversation.contactName}</p>
                  <p className="text-xs text-stone-500">{conversation.propertyTitle}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-all"><Phone className="w-5 h-5" /></button>
                  <button className="p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-all"><MoreVertical className="w-5 h-5" /></button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {conversation.messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'guest' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-sm px-4 py-2.5 rounded-2xl text-sm ${
                      msg.sender === 'guest'
                        ? 'bg-brand-700 text-white rounded-br-md'
                        : 'bg-stone-100 text-stone-900 rounded-bl-md'
                    }`}>
                      <p className="leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'guest' ? 'text-white/60' : 'text-stone-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick replies */}
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
                {['When is check-in?', 'Is parking available?', 'Can I check in early?'].map(r => (
                  <button key={r} onClick={() => setNewMsg(r)} className="shrink-0 text-xs px-3 py-1.5 rounded-full border border-stone-200 text-stone-600 hover:border-brand-700 hover:text-brand-700 transition-all whitespace-nowrap">{r}</button>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-stone-100 flex gap-3">
                <input
                  type="text"
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={e => e.key === 'Enter' && setNewMsg('')}
                  className="input-field flex-1 py-2.5"
                />
                <button onClick={() => setNewMsg('')} className="w-11 h-11 bg-brand-700 text-white rounded-xl flex items-center justify-center hover:bg-brand-800 transition-all shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center flex-col text-center">
              <MessageCircle className="w-16 h-16 text-stone-300 mb-4" />
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">Your Messages</h3>
              <p className="text-stone-500 text-sm">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
