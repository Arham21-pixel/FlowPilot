import { Handle, Position } from 'reactflow';

const TaskNode = ({ data, isConnectable }) => {
  const getIcon = () => {
    switch (data.type) {
      case 'Email Task':
        return <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
      case 'Delay Task':
        return <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
      case 'Webhook Task':
        return <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
      case 'Condition Task':
        return <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>;
      default:
        return <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
    }
  };

  return (
    <div className="bg-white px-4 py-3 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05)] rounded-[12px] border border-gray-100 min-w-[200px] flex items-center space-x-3">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-[#FFD54F]" />
      
      <div className="w-10 h-10 rounded-[12px] bg-[#FFF4CC] flex items-center justify-center flex-shrink-0 border border-[#FFD54F]/30">
        {getIcon()}
      </div>
      
      <div>
        <div className="font-extrabold text-sm text-gray-900">{data.label}</div>
        <div className="text-[11px] text-gray-500 font-medium">{data.subtext || "Configure task properties"}</div>
      </div>

      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-2.5 h-2.5 bg-[#FFD54F]" />
    </div>
  );
};

export default TaskNode;
