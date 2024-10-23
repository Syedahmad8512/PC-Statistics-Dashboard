import si from 'systeminformation';

export async function GET(request) {
  try {
    const cpu = await si.cpu();
    const memory = await si.mem();
    const disk = await si.fsSize();
    const load = await si.currentLoad();
    const users = await si.users();

    const username = users.length > 0 ? users[0].user : 'Unknown User';

    const systemData = {
      username: username,
      cpuCores: cpu.cores,
      cpuUsage: load.currentLoad.toFixed(2),
      totalRam: (memory.total / (1024 ** 3)).toFixed(2) + ' GB',
      usedRam: (memory.active / (1024 ** 3)).toFixed(2) + ' GB',
      freeRam: (memory.available / (1024 ** 3)).toFixed(2) + ' GB',
      diskTotal: (disk[0].size / (1024 ** 3)).toFixed(2) + ' GB',
      diskUsed: (disk[0].used / (1024 ** 3)).toFixed(2) + ' GB',
    };

    return new Response(JSON.stringify(systemData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    
  } catch (error) {
    console.error('Error fetching system data:', error);
    return new Response(JSON.stringify({ error: 'Unable to fetch system data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
